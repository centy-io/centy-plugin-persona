# centy-plugin-persona

A CLI plugin for [Centy](https://github.com/centy-io) that registers **persona** and **user story** item types into a centy-tracked project.

Running `persona init` sets up two structured item types in the centy daemon:

- **persona** — represents a user archetype with fields for `role`, `goals`, and `pain-points`
- **story** — represents a user story linked to a persona, with `acceptance-criteria` and `draft → ready → done` workflow statuses

This lets teams track UX personas and user stories alongside their codebase using the centy daemon.

## Prerequisites

`centy-plugin-persona` communicates with the **centy daemon** over **gRPC**.

- The [centy daemon](https://github.com/centy-io/centy-daemon) must be installed and running locally (default: `127.0.0.1:50051`)
- See the [centy-daemon repo](https://github.com/centy-io/centy-daemon) for installation and setup instructions

## Installation

```sh
# Run without installing
npx centy-plugin-persona init

# Install globally
npm install -g centy-plugin-persona
```

## Usage

### `persona init`

Registers the `persona` and `story` item types in the centy daemon for the current project.

```sh
persona init
```

**Flags:**

| Flag        | Description                            | Default       |
| ----------- | -------------------------------------- | ------------- |
| `--project` | Path to the centy-tracked project      | `process.cwd()` |
| `--port`    | Port the centy daemon is listening on  | `50051`       |

**Example:**

```sh
persona init --project /path/to/my-project --port 50051
```

If an item type already exists, it is skipped without error. The command is safe to run multiple times.

## Item Types

### persona

| Field         | Type   |
| ------------- | ------ |
| `role`        | string |
| `goals`       | string |
| `pain-points` | string |

Statuses: `active`, `archived` (default: `active`)

### story

| Field                  | Type   |
| ---------------------- | ------ |
| `persona`              | string |
| `acceptance-criteria`  | string |

Statuses: `draft`, `ready`, `done` (default: `draft`)

## License

MIT
