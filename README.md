[![Build and Test](https://github.com/bmuschko/setup-kubeconform/actions/workflows/build-test.yml/badge.svg)](https://github.com/bmuschko/setup-kubeconform/actions/workflows/build-test.yml)

# setup-kubeconform

A GitHub Action that sets up the commandline-based Kubernetes manifest validation tool [Kubeconform](https://github.com/yannh/kubeconform). The tool will be downloaded from the [Kubeconform releases page](https://github.com/yannh/kubeconform/releases), installed, and added to the `PATH` environment variable automatically. All operating systems and architectures are supported for released artifacts.

> **_NOTE:_** Instead of using this action, you may want to run [Kubeconform in a container](https://github.com/yannh/kubeconform#integrating-kubeconform-in-the-ci). Refer to the documentation for more information.

## Using the Action

It's recommended to use the action as a single setup step. Subsequent steps can directly call the executable. There are no limitation to the options that can be provided to the `kubeconform` command. The following example shows its usage.

```yaml
name: Validate Kubernetes manifests
on: [push, pull_request]
jobs:
  kubeconform:
    strategy:
      matrix:
        os: [ubuntu-latest, macos-latest, windows-latest]
    runs-on: ${{ matrix.os }}
    steps:
    - uses: actions/checkout@v4

    - name: Set up Kubeconform
      uses: bmuschko/setup-kubeconform@v1
    
    - name: Validate manifests
      run: kubeconform -summary -verbose .
```

See the [Kubeconform usage page](https://github.com/yannh/kubeconform#usage) for more information on available flags, or run `kubeconform --help` to render the list of flags in the console to craft your command.

## Action Inputs and Outputs

The action defines [inputs](https://docs.github.com/en/actions/creating-actions/metadata-syntax-for-github-actions#inputs) and [outputs](https://docs.github.com/en/actions/creating-actions/metadata-syntax-for-github-actions#outputs-for-docker-container-and-javascript-actions). The inputs let you drive the runtime behavior of the action. The outputs retrieve values populated after executing the action.

### Inputs

|Parameter|Required|Default Value|Description|
|:--:|:--:|:--:|:--|
|`kubeconform-version`|`false`|`0.6.3`|The version of the Kubeconform to be installed. The provided string should not include the prefix `v`.|

### Outputs

|Parameter|Description|
|:--:|:--:|
|`installation-path`|The installation path of Kubeconform, empty if it couldn't be installed.|

### Example

The following example shows the use of both inputs and outputs. Here, the default version of Kubeconform has been switched to 0.6.1. The workflow adds a step that renders the installation path after the Kubeconform executable has been installed.

```yaml
jobs:
  kubeconform:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4

    - name: Set up Kubeconform
      id: setup-kubeconform
      uses: bmuschko/setup-kubeconform@v1
      with:
        kubeconform-version: '0.6.1'

    - name: Print Kubeconform installation path
      env:
        KUBECONFORM_INSTALLATION_PATH: ${{ steps.setup-kubeconform.outputs.installation-path }}
      run: |
          echo "Kubeconform installed..."
          echo "Installation path: ${KUBECONFORM_INSTALLATION_PATH}"
      shell: bash
```
