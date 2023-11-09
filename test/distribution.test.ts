import * as distribution from '../src/distribution'

describe('creates kubeconform distribution', () => {
    const version = '0.6.4'

    describe('for Linux', () => {
        const os = 'linux'

        it('with arch x32', async () => {
            const dist = new distribution.KubeconformDistribution(version, os, 'x32')
            expect(dist.getDownloadURL()).toBe('https://github.com/yannh/kubeconform/releases/download/v0.6.4/kubeconform-linux-386.tar.gz');
        });
        it('with arch x64', async () => {
            const dist = new distribution.KubeconformDistribution(version, os, 'x64')
            expect(dist.getDownloadURL()).toBe('https://github.com/yannh/kubeconform/releases/download/v0.6.4/kubeconform-linux-amd64.tar.gz');
        });
        it('with arch arm64', async () => {
            const dist = new distribution.KubeconformDistribution(version, os, 'arm64')
            expect(dist.getDownloadURL()).toBe('https://github.com/yannh/kubeconform/releases/download/v0.6.4/kubeconform-linux-arm64.tar.gz');
        });
        it('with arch armv6', async () => {
            const dist = new distribution.KubeconformDistribution(version, os, 'armv6')
            expect(dist.getDownloadURL()).toBe('https://github.com/yannh/kubeconform/releases/download/v0.6.4/kubeconform-linux-armv6.tar.gz');
        });
    })

    describe('for MacOSX', () => {
        const os = 'darwin'

        it('with arch x64', async () => {
            const dist = new distribution.KubeconformDistribution(version, os, 'x64')
            expect(dist.getDownloadURL()).toBe('https://github.com/yannh/kubeconform/releases/download/v0.6.4/kubeconform-darwin-amd64.tar.gz');
        });
        it('with arch arm64', async () => {
            const dist = new distribution.KubeconformDistribution(version, os, 'arm64')
            expect(dist.getDownloadURL()).toBe('https://github.com/yannh/kubeconform/releases/download/v0.6.4/kubeconform-darwin-arm64.tar.gz');
        });
    })

    describe('for Windows', () => {
        const os = 'win32'

        it('with arch x32', async () => {
            const dist = new distribution.KubeconformDistribution(version, os, 'x32')
            expect(dist.getDownloadURL()).toBe('https://github.com/yannh/kubeconform/releases/download/v0.6.4/kubeconform-windows-386.zip');
        });
        it('with arch x64', async () => {
            const dist = new distribution.KubeconformDistribution(version, os, 'x64')
            expect(dist.getDownloadURL()).toBe('https://github.com/yannh/kubeconform/releases/download/v0.6.4/kubeconform-windows-amd64.zip');
        });
        it('with arch arm64', async () => {
            const dist = new distribution.KubeconformDistribution(version, os, 'arm64')
            expect(dist.getDownloadURL()).toBe('https://github.com/yannh/kubeconform/releases/download/v0.6.4/kubeconform-windows-arm64.zip');
        });
    })
})