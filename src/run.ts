import * as core from '@actions/core'
import type { Octokit } from '@octokit/action'
import type * as github from './github.js'
import { getVulnerabilityAlertsQuery } from './queries/getVulnerabilityAlerts.js'
import { filterVulnerabilityAlerts, parseVulnerabilityAlerts } from './vulnerabilityAlerts.js'

type Inputs = {
  path: string[]
  packageEcosystem: string[]
}

type Outputs = {
  packagesLines: string
}

export const run = async (inputs: Inputs, octokit: Octokit, context: github.Context): Promise<Outputs> => {
  const vulnerabilityAlertsQuery = await getVulnerabilityAlertsQuery(octokit, {
    owner: context.repo.owner,
    name: context.repo.repo,
  })
  const vulnerabilityAlerts = parseVulnerabilityAlerts(vulnerabilityAlertsQuery)
  core.info(`Total ${vulnerabilityAlerts.length} vulnerability alerts`)

  const filteredVulnerabilityAlerts = filterVulnerabilityAlerts(vulnerabilityAlerts, {
    pathPatterns: inputs.path,
    packageEcosystems: inputs.packageEcosystem,
  })
  core.info(`Found ${filteredVulnerabilityAlerts.length} vulnerability alerts for the specified path patterns`)

  const packagesLines = filteredVulnerabilityAlerts
    .map((vulnerabilityAlert) => `${vulnerabilityAlert.packageName}@${vulnerabilityAlert.firstPatchedVersion ?? ''}`)
    .join('\n')
  return { packagesLines }
}
