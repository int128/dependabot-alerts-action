import * as core from '@actions/core'
import type { Octokit } from '@octokit/action'
import type * as github from './github.js'
import { getVulnerabilityAlertsQuery } from './queries/getVulnerabilityAlerts.js'
import { parseVulnerabilityAlerts } from './vulnerabilityAlerts.js'

type Inputs = {
  path: string[]
}

export const run = async (inputs: Inputs, octokit: Octokit, context: github.Context): Promise<void> => {
  core.info(`Getting the vulnerability alerts`)
  const vulnerabilityAlertsQuery = await getVulnerabilityAlertsQuery(octokit, {
    owner: context.repo.owner,
    name: context.repo.repo,
  })
  const vulnerabilityAlerts = parseVulnerabilityAlerts(vulnerabilityAlertsQuery)
  core.info(JSON.stringify(vulnerabilityAlerts, undefined, 2))
}
