import { JSONSchemaBridge } from "uniforms-bridge-json-schema";
import { schemaDefinition } from "./schema";
import Ajv from "ajv";

// バリデーション用の ajv インスタンス作成
const ajv = new Ajv({ allErrors: true, useDefaults: true });

function createValidator(schema) {
  const validator = ajv.compile(schema);
  return (model) => {
    validator(model);
    return validator.errors?.length ? { details: validator.errors } : null;
  };
}

const schema = new JSONSchemaBridge(schemaDefinition, createValidator(schemaDefinition));

// 👇 ここを忘れずに
export { schema };
