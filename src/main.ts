import * as os from "os"

import * as core from "@actions/core"

import * as dist from "./distribution"
import * as setup from "./setup"

export async function run(): Promise<void> {
    try {
        // Get version of tool to be installed
        const version = core.getInput('kubeconform-version');
        console.log(`Setting up kubeconform with version '${version}'`)

        // Set up kubeconform
        const distribution = new dist.KubeconformDistribution(version, os.platform(), os.arch())
        setup.setupTool(distribution)
  } catch(error) {
      core.setFailed(String(error))
  }
}

run()