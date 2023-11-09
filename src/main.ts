import * as os from "os"

import * as core from "@actions/core"
import * as tc from "@actions/tool-cache"

import * as dist from "./distribution"

export async function run(): Promise<void> {
    try {
        // Get version of tool to be installed
        const version = core.getInput('kubeconform-version');
        console.log(`Installing kubeconform with version '${version}'`)

        // Determine download URL considering the OS and architecture
        const distribution = new dist.KubeconformDistribution(version, os.platform(), os.arch())
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

function extractDownloadedBinary(pathToArchive: string): Promise<string> {
    if (pathToArchive.endsWith('.zip')) {
        return tc.extractZip(pathToArchive)
    }

    return tc.extractTar(pathToArchive)
}

run()