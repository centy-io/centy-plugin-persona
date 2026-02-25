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

interface ItemTypeFeatures {
  display_number?: boolean;
  status?: boolean;
  priority?: boolean;
  assets?: boolean;
  org_sync?: boolean;
  move?: boolean;
  duplicate?: boolean;
}

interface CustomFieldDefinition {
  name: string;
  field_type: string;
  required?: boolean;
  default_value?: string;
  enum_values?: string[];
}

interface CreateItemTypeRequest {
  project_path: string;
  name: string;
  plural: string;
  identifier: string;
  features?: ItemTypeFeatures;
  statuses?: string[];
  default_status?: string;
  priority_levels?: number;
  custom_fields?: CustomFieldDefinition[];
}

interface CreateItemTypeResponse {
  success: boolean;
  error: string;
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
  const ServiceCtor = v1Pkg["CentyDaemon"];
  if (!isCentyServiceCtor(ServiceCtor)) {
    throw new ProtoLoadError();
  }
  return new ServiceCtor(`127.0.0.1:${port}`, credentials.createInsecure());
}
