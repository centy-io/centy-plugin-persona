# Contributing

## Prerequisites

- Node.js >= 18
- [pnpm](https://pnpm.io)

## Setup

```sh
git clone https://github.com/centy-io/persona.git
cd persona
pnpm install
```

## Development

```sh
pnpm dev   # watch mode
pnpm build # single build
```

## Testing

```sh
pnpm test            # run tests (fast, no coverage)
pnpm test:coverage   # run tests with 100% coverage enforcement
```

Coverage reports are written to `coverage/` (gitignored).

## Code Quality

```sh
pnpm lint        # check for lint errors
pnpm lint:fix    # auto-fix lint errors
pnpm lint:spell  # check spelling
```

## Git Hooks

This project uses [Husky](https://typicode.github.io/husky/) to enforce quality checks automatically.

**pre-commit** (runs on every commit):
- ESLint — blocks on lint errors
- cspell — blocks on spelling errors
- Tests — blocks if any test fails

**pre-push** (runs before pushing to remote):
- TypeScript build — blocks if compilation fails
- Tests with 100% coverage — blocks if any file falls below 100% statement/branch/function/line coverage

To bypass hooks in an emergency (not recommended): `git push --no-verify`

## Submitting Changes

1. Fork the repository
2. Create a branch: `git checkout -b my-feature`
3. Commit your changes
4. Push and open a pull request against `main`

## Issues

Report bugs or request features at <https://github.com/centy-io/persona/issues>.

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
