const os = require('os')
const util = require('util')
const core = require('@actions/core')
const tc = require('@actions/tool-cache')

export async function run(): Promise<void> {
    try {
        // Get version of tool to be installed
        const version = core.getInput('kubeconform-version');
        console.log(`Installing kubeconform with version '${version}'`)

        // Determine download URL considering the OS and architecture
        const downloadURL = getDownloadURL(version)
        console.log(`Downloading kubeconform binary from '${downloadURL}'`)

        // Download the specific version of the tool, e.g. as a tarball
        const pathToTarball = await tc.downloadTool(downloadURL)

        // Extract the archive onto the runner
        const pathToCLI = extractDownloadedBinary(pathToTarball)

        // Expose the tool by adding it to the PATH
        core.addPath(pathToCLI)
  } catch(error) {
      core.setFailed(String(error))
  }
}

function getDownloadURL(version: string): string {
    const distOS = mapOS(os.platform())
    const distArch = mapArch(os.arch())
    const fileExt = mapFileExtension(distOS)
    return util.format('https://github.com/yannh/kubeconform/releases/download/v%s/kubeconform-%s-%s.%s', version, distOS, distArch, fileExt)
}

// See https://nodejs.org/api/os.html#os_os_platform
function mapOS(os: string): string {
    switch(os) {
        case 'win32':
            return 'windows'
        default:
            return os
    }
}

// See https://nodejs.org/api/os.html#osarch
function mapArch(arch: string): string {
    switch(arch) {
        case 'x32':
            return '386'
        case 'x64':
            return 'amd64'
        default:
            return arch
    }
}

function mapFileExtension(os: string): string {
    return os == 'windows' ? 'zip' : 'tar.gz'
}

async function extractDownloadedBinary(pathToArchive: string): Promise<void> {
    if (pathToArchive.endsWith('.zip')) {
        return await tc.extractZip(pathToArchive)
    }

    return await tc.extractTar(pathToArchive)
}

run()