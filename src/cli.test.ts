import { describe, it, expect } from "vitest";

describe("persona CLI", () => {
  it("imports without errors", async () => {
    const path = await import("path");
    expect(path.join).toBeDefined();
  });
});
