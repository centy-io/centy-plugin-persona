import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    passWithNoTests: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov", "html"],
      thresholds: {
        statements: 100,
        branches: 100,
        functions: 100,
        lines: 100,
      },
      include: ["src/**/*.ts"],
      // Exclude test files and CLI entry point (index.ts is a bare oclif runner;
      // ESLint DDD rules disallow index.test.ts files)
      exclude: ["src/**/*.test.ts", "src/index.ts"],
    },
  },
});
