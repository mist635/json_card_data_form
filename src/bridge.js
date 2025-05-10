// src/bridge.js
import { JSONSchemaBridge } from "uniforms-bridge-json-schema";
import Ajv from "ajv";
import { schema } from "./schema";

const ajv = new Ajv({ allErrors: true, useDefaults: true });

function createValidator(schema) {
  const validate = ajv.compile(schema);
  return (model) => {
    validate(model);
    return validate.errors?.length ? { details: validate.errors } : null;
  };
}

export const bridge = new JSONSchemaBridge(schema, createValidator(schema));
