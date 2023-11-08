import * as util from 'util'

const core = require('@actions/core');
const tc = require('@actions/tool-cache');

async function setup() {
  // Get version of tool to be installed
  const version = core.getInput('kubeconform-version');
  console.log(`Installing kubeconform with version '${version}'`)

  // Download the specific version of the tool, e.g. as a tarball
  const pathToTarball = await tc.downloadTool(getDownloadURL(version));

  // Extract the tarball onto the runner
  const pathToCLI = await tc.extractTar(pathToTarball);

  // Expose the tool by adding it to the PATH
  core.addPath(pathToCLI)
}

function getDownloadURL(version: string): string {
  return util.format('https://github.com/yannh/kubeconform/releases/download/v%s/kubeconform-linux-amd64.tar.gz', version)
}

module.exports = setup