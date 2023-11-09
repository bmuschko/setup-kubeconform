import * as util from 'util'

export interface ToolDistribution {
    getDownloadURL(): string
}

export class KubeconformDistribution implements ToolDistribution {
    readonly version: string
    readonly os: string
    readonly arch: string
    readonly fileExt: string

    constructor(version: string, os: string, arch: string) {
        this.version = version
        this.os = this.mapOS(os)
        this.arch = this.mapArch(arch)
        this.fileExt = this.mapFileExtension(this.os)
    }

    // See https://nodejs.org/api/os.html#os_os_platform
    private mapOS(os: string): string {
        switch (os) {
            case 'win32':
                return 'windows'
            default:
                return os
        }
    }

    // See https://nodejs.org/api/os.html#osarch
    private mapArch(arch: string): string {
        switch (arch) {
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
        return util.format(
            'https://github.com/yannh/kubeconform/releases/download/v%s/kubeconform-%s-%s.%s',
            this.version,
            this.os,
            this.arch,
            this.fileExt
        )
    }
}
