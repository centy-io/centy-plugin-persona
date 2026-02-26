# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.3] - 2026-02-26

### Changed

- Renamed package from `@centy-io/persona` to `centy-plugin-persona`

## [0.1.2] - 2026-02-26

### Added

- `CHANGELOG.md` included in npm package files

### Changed

- CI: upgraded to Node 22 and npm 11 to meet npm trusted publishing requirements
- CI: switched to OIDC trusted publishing — no long-lived npm tokens required
- CI: `npm publish` replaces `pnpm publish` for native OIDC token exchange support

## [0.1.1] - 2026-02-26

### Changed

- Expanded README with clear package purpose, item type schemas, and CLI flag reference

### Fixed

- Corrected npm scope references from `@centy` to `@centy-io` throughout documentation

## [0.1.0] - 2026-02-25

### Added

- `persona init` command — registers `persona` and `story` item types in the centy daemon via gRPC
- `--project` flag to specify the centy-tracked project path (default: `cwd`)
- `--port` flag to configure the daemon port (default: `50051`)
- Graceful skip when an item type already exists (`ALREADY_EXISTS` gRPC status)
- GitHub Actions workflow for automated npm publishing on tag push
- Pre-commit (lint + test) and pre-push (build + coverage) hooks via Husky
- 100% test coverage enforced with Vitest
- ESLint with `eslint-config-agent` and cspell for spell checking
- Conventional commit enforcement via commitlint

[0.1.3]: https://github.com/centy-io/centy-plugin-persona/compare/v0.1.2...v0.1.3
[0.1.2]: https://github.com/centy-io/centy-plugin-persona/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/centy-io/centy-plugin-persona/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/centy-io/centy-plugin-persona/releases/tag/v0.1.0
