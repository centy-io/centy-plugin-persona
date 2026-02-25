export const ITEM_TYPES = [
  {
    name: "persona",
    plural: "personas",
    identifier: "slug",
    statuses: ["active", "archived"],
    default_status: "active",
    customFields: [
      { name: "role", field_type: "string" },
      { name: "goals", field_type: "string" },
      { name: "pain-points", field_type: "string" },
    ],
  },
  {
    name: "story",
    plural: "stories",
    identifier: "slug",
    statuses: ["draft", "ready", "done"],
    default_status: "draft",
    customFields: [
      { name: "persona", field_type: "string" },
      { name: "acceptance-criteria", field_type: "string" },
    ],
  },
] as const;
