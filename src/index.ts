import { join } from "path";
import { run, handle, flush } from "@oclif/core";

run(process.argv.slice(2), join(__dirname, ".."))
  .then(() => flush())
  .catch(handle);
