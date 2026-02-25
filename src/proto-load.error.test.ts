import { describe, it, expect } from "vitest";
import { ProtoLoadError } from "./proto-load.error";

describe("ProtoLoadError", () => {
  it("is an instance of Error with the expected message", () => {
    const error = new ProtoLoadError();
    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(ProtoLoadError);
    expect(error.message).toBe("Failed to load centy proto definition");
  });
});
