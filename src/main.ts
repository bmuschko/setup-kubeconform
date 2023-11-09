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
        const distribution = new Distribution(version, os.platform(), os.arch())
        const downloadURL = distribution.getDownloadURL()
        console.log(`Downloading kubeconform binary from '${downloadURL}'`)

        // Download the specific version of the tool, e.g. as a tarball
        const pathToTarball = await tc.downloadTool(downloadURL)

        // Extract the archive onto the runner
        const pathToCLI = await extractDownloadedBinary(pathToTarball)

        // Expose the tool by adding it to the PATH
        core.addPath(pathToCLI)
  } catch(error) {
      core.setFailed(String(error))
  }
}

class Distribution {
    private version: string
    private os: string
    private arch: string
    private fileExt: string

    constructor(version: string, os: string, arch: string) {
        this.version = version
        this.os = this.mapOS(os)
        this.arch = this.mapArch(arch)
        this.fileExt = this.mapFileExtension(this.os)
    }

    // See https://nodejs.org/api/os.html#os_os_platform
    private mapOS(os: string): string {
        switch(os) {
            case 'win32':
                return 'windows'
            default:
                return os
        }
    }

    // See https://nodejs.org/api/os.html#osarch
    private mapArch(arch: string): string {
        switch(arch) {
            case 'x32':
                return '386'
            case 'x64':
                return 'amd64'
            default:
                return arch
        }
    }

    private mapFileExtension(os: string): string {
        return os == 'windows' ? 'zip' : 'tar.gz'
    }

    getDownloadURL(): string {
        return util.format('https://github.com/yannh/kubeconform/releases/download/v%s/kubeconform-%s-%s.%s', this.version, this.os, this.arch, this.fileExt)
    }
}

function extractDownloadedBinary(pathToArchive: string): Promise<void> {
    if (pathToArchive.endsWith('.zip')) {
        return tc.extractZip(pathToArchive)
    }

    return tc.extractTar(pathToArchive)
}

run()