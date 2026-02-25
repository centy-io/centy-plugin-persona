import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/**/*.ts"],
  format: ["cjs"],
  target: "node18",
  clean: true,
  dts: true,
  bundle: false,
  banner: {
    js: "#!/usr/bin/env node",
  },
});
