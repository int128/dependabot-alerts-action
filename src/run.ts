import * as core from '@actions/core'
import type { Octokit } from '@octokit/action'
import type * as github from './github.js'
import { getVulnerabilityAlertsQuery } from './queries/getVulnerabilityAlerts.js'
import {
  dedupeVulnerabilityPackages,
  filterVulnerabilityAlerts,
  parseVulnerabilityAlerts,
} from './vulnerabilityAlerts.js'

type Inputs = {
  path: string[]
  packageEcosystem: string[]
}

type Outputs = {
  dependencyFiles: string[]
  packagesLines: string
  packagesJson: Record<string, string>
}

export const run = async (inputs: Inputs, octokit: Octokit, context: github.Context): Promise<Outputs> => {
  const vulnerabilityAlertsQuery = await getVulnerabilityAlertsQuery(octokit, {
    owner: context.repo.owner,
    name: context.repo.repo,
  })
  const vulnerabilityAlerts = parseVulnerabilityAlerts(vulnerabilityAlertsQuery)
  core.info(`Total ${vulnerabilityAlerts.length} vulnerability alerts in the repository`)

  const filteredVulnerabilityAlerts = filterVulnerabilityAlerts(vulnerabilityAlerts, {
    pathPatterns: inputs.path,
    packageEcosystems: inputs.packageEcosystem,
  })
  core.info(
    `Found ${filteredVulnerabilityAlerts.length} vulnerability alerts for the specified path patterns and package ecosystems`,
  )

  const dependencyFiles = [...new Set(filteredVulnerabilityAlerts.map((vulnerabilityAlert) => vulnerabilityAlert.path))]
  const vulnerabilityPackages = dedupeVulnerabilityPackages(filteredVulnerabilityAlerts)
  return {
    dependencyFiles,
    packagesLines: vulnerabilityPackages
      .map((vulnerabilityAlert) => `${vulnerabilityAlert.packageName}@${vulnerabilityAlert.firstPatchedVersion}`)
      .join('\n'),
    packagesJson: Object.fromEntries(
      vulnerabilityPackages.map((vulnerabilityAlert) => [
        vulnerabilityAlert.packageName,
        vulnerabilityAlert.firstPatchedVersion,
      ]),
    ),
  }
}
