import { globSync } from 'glob';
import path from 'path';
import * as esbuild from 'esbuild';

// bundle components into a format for deployment
(async () => {
  // get all component service directories
  const csComponents = globSync(
    path.join('.', 'dxp', 'component-service', '*/')
  );
  // Define our array of build promises
  const allBuildPromises = [];

  // For each component use esbuild to format to cjs
  for (let i = 0; i < csComponents.length; i++) {
    // Get the current component path
    const componentPath = csComponents[i];
    // process component
    let buildPromise = await esbuild.build({
      entryPoints: [path.join(componentPath, 'main.js')],
      bundle: true,
      treeShaking: true,
      outdir: path.join(componentPath),
      format: 'cjs',
      platform: 'node',
      target: 'node20',
      sourcemap: false,
      external: ['react', 'react-dom', 'react-dom-server'],
      outExtension: {
        '.js': '.cjs'
      }
    });
    // Push our promises to the component array
    allBuildPromises.push(buildPromise);
  }

  // When all promises have resolved then log that we have succeeded with the build
  Promise.all(allBuildPromises).then(async () => {
    console.log('✅ build has completed successfully');
  });
})();
