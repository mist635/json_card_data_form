// src/schema.js
const schemaDefinition = {
  title: "プロフィール",
  type: "object",
  properties: {
    name: { type: "string", title: "名前" },
    age: { type: "number", title: "年齢" }
  },
  required: ["name", "age"]
};

export { schemaDefinition };
