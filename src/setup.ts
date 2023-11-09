import * as core from '@actions/core'
import * as tc from '@actions/tool-cache'

import * as dist from './distribution'

export async function setupTool(distribution: dist.ToolDistribution): Promise<void> {
    // Determine download URL considering the OS and architecture
    const downloadURL = distribution.getDownloadURL()
    core.info(`Downloading kubeconform binary from '${downloadURL}'`)

    // Download the specific version of the tool, e.g. as a tarball
    const pathToTarball = await tc.downloadTool(downloadURL)

    // Extract the archive onto the runner
    const pathToCLI = await extractDownloadedBinary(pathToTarball)

    // Expose the tool by adding it to the PATH
    core.addPath(pathToCLI)

    // Set the installation path as output
    core.setOutput('installation-path', pathToCLI)
}

async function extractDownloadedBinary(pathToArchive: string): Promise<string> {
    if (pathToArchive.endsWith('.zip')) {
        return tc.extractZip(pathToArchive)
    }

    return tc.extractTar(pathToArchive)
}
