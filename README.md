# dependabot-alerts-action [![ts](https://github.com/int128/dependabot-alerts-action/actions/workflows/ts.yaml/badge.svg)](https://github.com/int128/dependabot-alerts-action/actions/workflows/ts.yaml)

This is an action to list the Dependabot alerts for a repository.

## Getting Started

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: int128/dependabot-alerts-action@v1
```

## Specification

### Inputs

| Name                | Default        | Description                                       |
| ------------------- | -------------- | ------------------------------------------------- |
| `path`              | (required)     | Glob pattern of the file path to check for alerts |
| `package-ecosystem` | (required)     | List of package ecosystems (e.g. `NPM`)           |
| `token`             | `github.token` | GitHub token                                      |

### Outputs

| Name             | Description                                                                                      |
| ---------------- | ------------------------------------------------------------------------------------------------ |
| `paths-json`     | JSON array of file paths with Dependabot alerts                                                  |
| `packages-lines` | Multiline string in the format of `package-name@version`                                         |
| `packages-json`  | JSON object with package names as keys and versions as values (e.g. `{"package-name": "1.2.3"}`) |
