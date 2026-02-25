import { describe, it, expect, vi, beforeEach } from "vitest";
import { status } from "@grpc/grpc-js";
import { createDaemonClient } from "../daemon-client";
import { Init } from "./init";

vi.mock("../daemon-client", () => ({
  createDaemonClient: vi.fn(),
}));

type DaemonClient = ReturnType<typeof createDaemonClient>;

const DEFAULT_FLAGS = { project: "/tmp", port: 50051 };

function makeInit(): Init {
  const cmd = new Init([], {} as never);
  vi.spyOn(cmd, "parse").mockResolvedValue({
    flags: DEFAULT_FLAGS,
    args: {},
    argv: [],
    raw: [],
  } as never);
  return cmd;
}

function makeMockClient(
  behavior: (req: unknown, cb: (err: unknown, res: unknown) => void) => void
): DaemonClient {
  return {
    createItemType: vi.fn(behavior),
    close: vi.fn(),
  } as unknown as DaemonClient;
}

describe("Init command", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("registers persona and story types then closes the client", async () => {
    const mockClient = makeMockClient((_req, cb) => cb(null, { success: true }));
    vi.mocked(createDaemonClient).mockReturnValue(mockClient);

    await makeInit().run();

    expect(createDaemonClient).toHaveBeenCalledWith(DEFAULT_FLAGS.port);
    expect(mockClient.createItemType).toHaveBeenCalledTimes(2);
    expect(mockClient.close).toHaveBeenCalled();
  });

  it("skips gracefully when a type already exists", async () => {
    const alreadyExistsErr = { code: status.ALREADY_EXISTS };
    const mockClient = makeMockClient((_req, cb) => cb(alreadyExistsErr, null));
    vi.mocked(createDaemonClient).mockReturnValue(mockClient);

    await expect(makeInit().run()).resolves.toBeUndefined();
  });

  it("rejects when the daemon returns an unexpected gRPC error", async () => {
    const unavailableErr = { code: status.UNAVAILABLE, message: "unreachable" };
    const mockClient = makeMockClient((_req, cb) => cb(unavailableErr, null));
    vi.mocked(createDaemonClient).mockReturnValue(mockClient);

    await expect(makeInit().run()).rejects.toBeDefined();
  });
});
