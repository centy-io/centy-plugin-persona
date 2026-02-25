export class ProtoLoadError extends Error {
  constructor() {
    super("Failed to load centy proto definition");
  }
}
