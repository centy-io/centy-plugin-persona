import { describe, it, expect, vi, beforeEach } from "vitest";
import { loadPackageDefinition } from "@grpc/grpc-js";
import { ProtoLoadError } from "./proto-load.error";
import { createDaemonClient } from "./daemon-client";

vi.mock("@grpc/grpc-js", () => ({
  loadPackageDefinition: vi.fn(),
  credentials: { createInsecure: vi.fn().mockReturnValue({}) },
}));

vi.mock("@grpc/proto-loader", () => ({
  loadSync: vi.fn().mockReturnValue({}),
}));

describe("createDaemonClient", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("throws ProtoLoadError when centy package is missing", () => {
    vi.mocked(loadPackageDefinition).mockReturnValue({});
    expect(() => createDaemonClient(50051)).toThrow(ProtoLoadError);
  });

  it("throws ProtoLoadError when v1 package is missing", () => {
    vi.mocked(loadPackageDefinition).mockReturnValue({ centy: {} });
    expect(() => createDaemonClient(50051)).toThrow(ProtoLoadError);
  });

  it("throws ProtoLoadError when CentyService constructor is missing", () => {
    vi.mocked(loadPackageDefinition).mockReturnValue({
      centy: { v1: {} },
    });
    expect(() => createDaemonClient(50051)).toThrow(ProtoLoadError);
  });

  it("returns a client bound to the given port on success", () => {
    let capturedAddress = "";

    vi.mocked(loadPackageDefinition).mockReturnValue({
      centy: {
        v1: {
          CentyService: function MockCentyService(
            this: { close: () => void },
            address: string
          ) {
            capturedAddress = address;
            this.close = vi.fn();
          },
        },
      },
    });

    const client = createDaemonClient(9999);

    expect(capturedAddress).toBe("127.0.0.1:9999");
    expect(typeof client.close).toBe("function");
  });
});
