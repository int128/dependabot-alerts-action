import * as Types from './graphql-types.js';

export type GetVulnerabilityAlertsQueryVariables = Types.Exact<{
  owner: Types.Scalars['String']['input'];
  name: Types.Scalars['String']['input'];
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetVulnerabilityAlertsQuery = { __typename?: 'Query', repository?: { __typename?: 'Repository', vulnerabilityAlerts?: { __typename?: 'RepositoryVulnerabilityAlertConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null }, nodes?: Array<{ __typename?: 'RepositoryVulnerabilityAlert', vulnerableManifestPath: string, securityVulnerability?: { __typename?: 'SecurityVulnerability', severity: Types.SecurityAdvisorySeverity, package: { __typename?: 'SecurityAdvisoryPackage', ecosystem: Types.SecurityAdvisoryEcosystem, name: string }, firstPatchedVersion?: { __typename?: 'SecurityAdvisoryPackageVersion', identifier: string } | null } | null } | null> | null } | null } | null };
