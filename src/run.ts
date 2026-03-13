import * as core from '@actions/core'
import type { Octokit } from '@octokit/action'
import type * as github from './github.js'
import { getVulnerabilityAlertsQuery } from './queries/getVulnerabilityAlerts.js'
import {
  dedupeVulnerabilityAlerts,
  filterVulnerabilityAlerts,
  parseVulnerabilityAlerts,
} from './vulnerabilityAlerts.js'

type Inputs = {
  path: string[]
  packageEcosystem: string[]
}

type Outputs = {
  pathsJson: string[]
  packagesLines: string
  packagesJson: Record<string, string>
}

export const run = async (inputs: Inputs, octokit: Octokit, context: github.Context): Promise<Outputs> => {
  const vulnerabilityAlertsQuery = await getVulnerabilityAlertsQuery(octokit, {
    owner: context.repo.owner,
    name: context.repo.repo,
  })
  const rawVulnerabilityAlerts = parseVulnerabilityAlerts(vulnerabilityAlertsQuery)
  core.info(`Total ${rawVulnerabilityAlerts.length} vulnerability alerts`)

  const vulnerabilityAlerts = dedupeVulnerabilityAlerts(
    filterVulnerabilityAlerts(rawVulnerabilityAlerts, {
      pathPatterns: inputs.path,
      packageEcosystems: inputs.packageEcosystem,
    }),
  )
  core.info(`Found ${vulnerabilityAlerts.length} vulnerability alerts for the specified path patterns`)

  return {
    pathsJson: vulnerabilityAlerts.map((vulnerabilityAlert) => vulnerabilityAlert.path),
    packagesLines: vulnerabilityAlerts
      .map((vulnerabilityAlert) => `${vulnerabilityAlert.packageName}@${vulnerabilityAlert.firstPatchedVersion}`)
      .join('\n'),
    packagesJson: Object.fromEntries(
      vulnerabilityAlerts.map((vulnerabilityAlert) => [
        vulnerabilityAlert.packageName,
        vulnerabilityAlert.firstPatchedVersion,
      ]),
    ),
  }
}
