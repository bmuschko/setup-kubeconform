const os = require('os')
const util = require('util')
const core = require('@actions/core')
const tc = require('@actions/tool-cache')

export async function run(): Promise<void> {
    try {
        // Get version of tool to be installed
        const version = core.getInput('kubeconform-version');
        console.log(`Installing kubeconform with version '${version}'`)

        // Download the specific version of the tool, e.g. as a tarball
        const pathToTarball = await tc.downloadTool(getDownloadURL(version))

        // Extract the tarball onto the runner
        const pathToCLI = await tc.extractTar(pathToTarball)

        // Expose the tool by adding it to the PATH
        core.addPath(pathToCLI)
  } catch(error) {
      core.setFailed(String(error))
  }
}

function getDownloadURL(version: string): string {
    const distOS = mapOS(os.platform())
    const distArch = mapArch(os.arch())
    return util.format('https://github.com/yannh/kubeconform/releases/download/v%s/kubeconform-%s-%s.tar.gz', version, distOS, distArch)
}

function mapOS(os: string) {
    switch(os) {
        case 'win32':
            return 'windows'
        default:
            return os
    }
}

function mapArch(arch: string) {
    switch(arch) {
        case 'x32':
            return '386'
        case 'x64':
            return 'amd64'
        default:
            return arch
    }
}

run()