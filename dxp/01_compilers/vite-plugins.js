import { readFileSync } from 'fs';
import { globSync } from 'glob';
import path from 'path';
import generateManifestRecord from './manifest-compiler';

/**
 * Make a fetch GET request and it if it fails retry N times with a X delay between requests
 * @param {String} url url to send the GET request to
 * @param {Object} options additional fetch options object
 * @param {Number} delay delay between requests in ms
 * @param {Number} retryCount max retry count
 * @returns {Promise}
 */
const fetchWithRetry = async (
  url,
  options = {},
  delay = 200,
  retryCount = 3
) => {
  let attempts = 0;

  const executeRequest = async () => {
    try {
      attempts++;
      const response = await fetch(url, { ...options, method: 'GET' });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response;
    } catch (error) {
      if (attempts >= retryCount) {
        throw error;
      }
      const cDelay = delay * attempts * 2;
      console.warn(
        `Request failed, retrying in ${cDelay}ms... (Attempt ${attempts}/${retryCount})`
      );
      await new Promise((resolve) => setTimeout(resolve, cDelay));
      return executeRequest();
    }
  };

  return executeRequest();
};

// Example asynchronous component rendering function
async function renderComponent(path, previewKey) {
  try {
    const manifestRecords = JSON.parse(
      readFileSync('./dxp/01_compilers/manifests.json', 'utf-8')
    );
    const resolvedManifestPath = manifestRecords.find((item) =>
      item.includes(path)
    );
    if (!resolvedManifestPath) {
      throw new Error(
        `Path "${path}" not found in manifest records. Check ./dxp/01_compilers/manifests.json.`
      );
    }
    const [namespace, name, version] = resolvedManifestPath.split('/');
    // kernel__helloworld__0.2.12?_previewKey=default
    // const response = await fetch(`http://localhost:5555/dev/render/${namespace}__${name}__${version}?_previewKey=${previewKey}`);
    const response = await fetchWithRetry(
      `http://localhost:5555/dev/render/${namespace}__${name}__${version}?_previewKey=${previewKey}`,
      {},
      200,
      10
    );
    const data = await response.text();
    return data;
  } catch (er) {
    console.error(er);
    return '';
  }
}

export async function dxp() {
  return {
    name: 'dxp-plugin',
    enforce: 'pre',
    configResolved(config) {
      // This runs before the server starts and the config is fully resolved
      // generate manifest entries
      generateManifestRecord('/manifest.json');
    },
    buildStart() {
      // console.log('#### buildStarts');
    },
    async watchChange(file, { event }) {
      // console.log('#### watchChange id', id)
      await generateManifestRecord(file);
    },
    handleHotUpdate({ file, server }) {
      // console.log('#### handleHotUpdate', file);
    },
    async transform(code, id) {
      //console.log('#### transform');
      if (process.env.NODE_ENV !== 'development') return;
      if (!id.includes('/src/html/') || !id.endsWith('.js')) return;
      if (!id.endsWith('.js')) return;
      // add component files to watch files so changes are fetched
      const entryFiles = globSync(
        path.posix.join('.', 'dxp', 'component-service', '**', 'main.js')
      );
      entryFiles.forEach((entryFile) => {
        this.addWatchFile(entryFile);
      });

      // Regex to match component patterns
      const regex = /<!--@@\s*cmp\s+([\w-/]+)(?:\s+([\w-]+))?\s*@@-->/g;
      const matches = [...code.matchAll(regex)];
      const promises = [];
      for (const match of matches) {
        const [fullMatch, componentPath, previewKey = 'default'] = match;
        const renderPromise = renderComponent(componentPath, previewKey).then(
          (renderedComponent) => {
            return { fullMatch, renderedComponent };
          }
        );
        promises.push(renderPromise);
      }

      const resolvedComponents = await Promise.all(promises);

      for (const { fullMatch, renderedComponent } of resolvedComponents) {
        code = code.replace(fullMatch, renderedComponent);
      }
      return {
        code,
        map: null
      };
    }
  };
}
