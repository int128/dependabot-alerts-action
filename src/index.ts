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
  core.setOutput('packages-lines', outputs.packagesLines)
}

try {
  await main()
} catch (e: unknown) {
  core.setFailed(e instanceof Error ? e : String(e))
  console.error(e)
}
