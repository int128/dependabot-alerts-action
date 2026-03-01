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

| Name    | Default        | Description                                       |
| ------- | -------------- | ------------------------------------------------- |
| `path`  | -              | Glob pattern of the file path to check for alerts |
| `token` | `github.token` | GitHub token                                      |

### Outputs

| Name             | Description                 |
| ---------------- | --------------------------- |
| `packages-json`  | JSON string of the packages |
| `packages-lines` | Lines of the packages       |
