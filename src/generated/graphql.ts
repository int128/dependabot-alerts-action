/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import * as Types from './graphql-types.js';

/** The possible ecosystems of a security vulnerability's package. */
export type SecurityAdvisoryEcosystem =
  /** GitHub Actions */
  | 'ACTIONS'
  /** PHP packages hosted at packagist.org */
  | 'COMPOSER'
  /** Erlang/Elixir packages hosted at hex.pm */
  | 'ERLANG'
  /** Go modules */
  | 'GO'
  /** Java artifacts hosted at the Maven central repository */
  | 'MAVEN'
  /** JavaScript packages hosted at npmjs.com */
  | 'NPM'
  /** .NET packages hosted at the NuGet Gallery */
  | 'NUGET'
  /** Python packages hosted at PyPI.org */
  | 'PIP'
  /** Dart packages hosted at pub.dev */
  | 'PUB'
  /** Ruby gems hosted at RubyGems.org */
  | 'RUBYGEMS'
  /** Rust crates */
  | 'RUST'
  /** Swift packages */
  | 'SWIFT';

/** Severity of the vulnerability. */
export type SecurityAdvisorySeverity =
  /** Critical. */
  | 'CRITICAL'
  /** High. */
  | 'HIGH'
  /** Low. */
  | 'LOW'
  /** Moderate. */
  | 'MODERATE';

export type GetVulnerabilityAlertsQueryVariables = Exact<{
  owner: string;
  name: string;
  after?: string | null | undefined;
}>;


export type GetVulnerabilityAlertsQuery = { repository: { vulnerabilityAlerts: { pageInfo: { hasNextPage: boolean, endCursor: string | null }, nodes: Array<{ vulnerableManifestPath: string, securityVulnerability: { severity: Types.SecurityAdvisorySeverity, package: { ecosystem: Types.SecurityAdvisoryEcosystem, name: string }, firstPatchedVersion: { identifier: string } | null } | null } | null> | null } | null } | null };
