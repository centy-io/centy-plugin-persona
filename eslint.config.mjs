import agentConfig from 'eslint-config-agent'

export default [
  ...agentConfig,
  {
    rules: {
      'ddd/require-spec-file': [
        'error',
        {
          excludePatterns: [
            '**/*.spec.js',
            '**/*.spec.ts',
            '**/*.test.js',
            '**/*.test.ts',
            '**/index.js',
            '**/index.ts',
            '**/*.d.ts',
            '**/*.config.js',
            '**/*.config.ts',
            '**/eslint.config.js',
            '**/*.stories.{js,jsx,ts,tsx}',
            '**/*-error.{js,ts}',
            '**/*.error.{js,ts}',
            '**/errors/**',
            '**/exceptions/**',
            '**/commands/**',
            '**/daemon-client.ts',
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.test.ts', '**/*.test.js'],
    rules: {
      'no-restricted-syntax': 'off',
    },
  },
]
