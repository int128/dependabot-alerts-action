import * as core from '@actions/core'
import * as github from './github.js'
import { run } from './run.js'

const main = async (): Promise<void> => {
  await run(
    {
      path: core.getMultilineInput('path'), //, { required: true }),
    },
    github.getOctokit(),
    github.getContext(),
  )
}

try {
  await main()
} catch (e: unknown) {
  core.setFailed(e instanceof Error ? e : String(e))
  console.error(e)
}
