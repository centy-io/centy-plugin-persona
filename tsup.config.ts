import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/**/*.ts", "!src/**/*.test.ts"],
  format: ["cjs"],
  target: "node18",
  clean: true,
  dts: true,
  bundle: false,
  banner: {
    js: "#!/usr/bin/env node",
  },
});
