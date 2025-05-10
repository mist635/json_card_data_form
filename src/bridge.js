// src/bridge.js
import { JSONSchemaBridge } from "uniforms-bridge-json-schema";
import Ajv from "ajv";

const schema = {
  type: "object",
  properties: {
    name: { type: "string", title: "名前" }
  },
  required: ["name"]
};

const ajv = new Ajv({ allErrors: true, useDefaults: true, strict: false });

function createValidator(schema) {
  const validate = ajv.compile(schema);
  return (model) => {
    const valid = validate(model);
    return valid ? null : { details: validate.errors || [] };
  };
}

export const bridge = new JSONSchemaBridge(schema, createValidator(schema));
