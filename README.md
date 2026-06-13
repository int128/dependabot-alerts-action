# dependabot-alerts-action [![ts](https://github.com/int128/dependabot-alerts-action/actions/workflows/ts.yaml/badge.svg)](https://github.com/int128/dependabot-alerts-action/actions/workflows/ts.yaml)

This is an action to list the Dependabot alerts for a repository.

## Getting Started

Here is an example workflow to use this action:

```yaml
jobs:
  notify:
    runs-on: ubuntu-slim
    permissions:
      vulnerability-alerts: read
    steps:
      - id: dependabot-alerts
        uses: int128/dependabot-alerts-action@v0
        with:
          path: "**/*"
          package-ecosystem: "*"
```

You can specify the `path` input to filter the dependency files to check for alerts.
It supports multiple patterns separated by newlines.

```yaml
- uses: int128/dependabot-alerts-action@v0
  with:
    path: |
      frontend/package-lock.json
      backend/pom.xml
```

It also supports negation patterns to exclude certain files.

```yaml
- uses: int128/dependabot-alerts-action@v0
  with:
    path: |
      **
      !**/package-lock.json
```

You can specify the `package-ecosystem` input to filter the package ecosystems to check for alerts.
It supports glob patterns with negation patterns (e.g. `!NPM`) and multiple patterns separated by newlines.

```yaml
- uses: int128/dependabot-alerts-action@v0
  with:
    package-ecosystem: |
      NPM
```

## Specification

### Inputs

| Name                | Default        | Description                                       |
| ------------------- | -------------- | ------------------------------------------------- |
| `path`              | (required)     | Glob pattern of the file path to check for alerts |
| `package-ecosystem` | (required)     | Glob pattern of package ecosystems (e.g. `NPM`)   |
| `token`             | `github.token` | GitHub token                                      |

### Outputs

| Name                    | Description                                                                                      |
| ----------------------- | ------------------------------------------------------------------------------------------------ |
| `dependency-files-json` | JSON array of dependency file paths with Dependabot alerts                                       |
| `packages-lines`        | Multiline string in the format of `package-name@version`                                         |
| `packages-json`         | JSON object with package names as keys and versions as values (e.g. `{"package-name": "1.2.3"}`) |
| `packages-count`        | Number of packages with Dependabot alerts                                                        |
