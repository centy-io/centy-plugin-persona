import { run, handle, flush } from "@oclif/core";
import { join } from "path";

run(process.argv.slice(2), join(__dirname, ".."))
  .then(() => flush())
  .catch(handle);
