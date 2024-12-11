import path from 'path';
import { globSync } from 'glob';
import fs from 'fs';

// Function to compile manifest data
export default async function generateManifestRecord(file) {
  if (!file || !file.endsWith('manifest.json')) return;
  // output array of strings: ["namespace/name/version", "..."]
  const content = [];
  // get all manifest.json files
  const manifests = globSync(
    path.join('.', 'dxp', 'component-service', '*', 'manifest.json')
  );

  // Loop through each manifest.json file
  for (const manifestPath of manifests) {
    try {
      // Read and parse the manifest.json file
      const manifestData = JSON.parse(
        await fs.promises.readFile(manifestPath, 'utf-8')
      );

      // Extract name, namespace, and version from the manifest file
      const { name, namespace, version } = manifestData;

      // Format it as "namespace/name/version"
      if (name && namespace && version) {
        content.push(`${namespace}/${name}/${version}`);
      } else {
        console.warn(`Missing data in manifest: ${manifestPath}`);
      }
    } catch (error) {
      console.error(`Error reading manifest file: ${manifestPath}`, error);
    }
  }

  // Write the formatted content array to a new file
  try {
    await fs.promises.writeFile(
      './dxp/01_compilers/manifests.json',
      JSON.stringify(content, null, 2),
      'utf-8'
    );
  } catch (error) {
    console.error('Error writing manifests.json:', error);
  }
}
