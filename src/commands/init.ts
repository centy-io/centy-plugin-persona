import { status } from "@grpc/grpc-js";
import { Command, Flags } from "@oclif/core";
import { createDaemonClient } from "../daemon-client";

interface FieldDef {
  name: string;
  type: string;
}

interface ItemTypeConfig {
  name: string;
  customFields: FieldDef[];
}

const ITEM_TYPES: ItemTypeConfig[] = [
  {
    name: "persona",
    customFields: [
      { name: "role", type: "string" },
      { name: "goals", type: "string" },
      { name: "pain-points", type: "string" },
    ],
  },
  {
    name: "story",
    customFields: [
      { name: "persona", type: "string" },
      { name: "acceptance-criteria", type: "markdown" },
    ],
  },
];

export class Init extends Command {
  static description: string;
  static flags: ReturnType<typeof buildFlags>;

  async run(): Promise<void> {
    const { flags } = await this.parse(Init);
    const client = createDaemonClient(flags.port);
    for (const itemType of ITEM_TYPES) {
      await registerItemType(this, client, flags.project, itemType);
    }
    client.close();
  }
}

function buildFlags() {
  return {
    project: Flags.string({
      description: "Path to the centy-tracked project",
      default: process.cwd(),
    }),
    port: Flags.integer({
      description: "Port of the centy daemon",
      default: 50051,
    }),
  };
}

async function registerItemType(
  cmd: Init,
  client: ReturnType<typeof createDaemonClient>,
  projectPath: string,
  itemType: ItemTypeConfig
): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    client.createItemType(
      {
        project_path: projectPath,
        name: itemType.name,
        custom_fields: itemType.customFields,
      },
      (error, _response) => {
        if (error) {
          if (error.code === status.ALREADY_EXISTS) {
            cmd.log(`Item type "${itemType.name}" already exists, skipping.`);
            resolve();
            return;
          }
          reject(error);
          return;
        }
        cmd.log(`Created item type "${itemType.name}".`);
        resolve();
      }
    );
  });
}

Init.description =
  "Initialize persona and story item types in the centy daemon";
Init.flags = buildFlags();
