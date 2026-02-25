import { join } from "path";
import {
  loadPackageDefinition,
  credentials,
  type Client,
  type ClientUnaryCall,
  type ChannelCredentials,
  type GrpcObject,
  type ServiceClientConstructor,
  type ServiceError,
} from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";
import { ProtoLoadError } from "./proto-load.error";

const PROTO_PATH = join(__dirname, "..", "proto", "centy", "v1", "centy.proto");

interface FieldDefinition {
  name: string;
  type: string;
}

interface CreateItemTypeRequest {
  project_path: string;
  name: string;
  custom_fields: FieldDefinition[];
}

interface CreateItemTypeResponse {
  id: string;
}

type MaybeServiceError = ServiceError | null;

type CreateItemTypeCallback = (
  error: MaybeServiceError,
  response: CreateItemTypeResponse
) => void;

interface CentyServiceClientInterface extends Client {
  createItemType(
    request: CreateItemTypeRequest,
    callback: CreateItemTypeCallback
  ): ClientUnaryCall;
}

interface CentyServiceClientConstructor extends ServiceClientConstructor {
  new (
    address: string,
    channelCredentials: ChannelCredentials
  ): CentyServiceClientInterface;
}

function isGrpcObject(value: GrpcObject[string]): value is GrpcObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isCentyServiceCtor(
  value: GrpcObject[string]
): value is CentyServiceClientConstructor {
  return typeof value === "function";
}

export function createDaemonClient(port: number): CentyServiceClientInterface {
  const packageDefinition = loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  });
  const protoDescriptor = loadPackageDefinition(packageDefinition);
  const centyPkg = protoDescriptor["centy"];
  if (!isGrpcObject(centyPkg)) {
    throw new ProtoLoadError();
  }
  const v1Pkg = centyPkg["v1"];
  if (!isGrpcObject(v1Pkg)) {
    throw new ProtoLoadError();
  }
  const ServiceCtor = v1Pkg["CentyService"];
  if (!isCentyServiceCtor(ServiceCtor)) {
    throw new ProtoLoadError();
  }
  return new ServiceCtor(`127.0.0.1:${port}`, credentials.createInsecure());
}
