import * as core from '@actions/core'
import * as github from './github.js'
import { run } from './run.js'

const main = async (): Promise<void> => {
  const outputs = await run(
    {
      path: core.getMultilineInput('path', { required: true }),
      packageEcosystem: core.getMultilineInput('package-ecosystem', { required: true }),
    },
    github.getOctokit(),
    github.getContext(),
  )
  core.startGroup('Outputs')
  core.info(JSON.stringify(outputs, null, 2))
  core.endGroup()
  core.setOutput('dependency-files-json', JSON.stringify(outputs.dependencyFiles))
  core.setOutput('packages-lines', outputs.packagesLines)
  core.setOutput('packages-json', JSON.stringify(outputs.packagesJson))
}

try {
  await main()
} catch (e: unknown) {
  core.setFailed(e instanceof Error ? e : String(e))
  console.error(e)
}
