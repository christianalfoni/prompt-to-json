import JSON5 from "json5";
import { ExtractValueType, ValueTypes } from "./schema.js";
import { anyOf, string, array, boolean, object, enums } from "./schema.js";

export const schema = {
  anyOf,
  string,
  array,
  boolean,
  object,
  enums,
};

function createJsonPrompt(
  prompt: string,
  json: Record<string, ValueTypes>,
  exampleOutput: Array<{
    [key: string]: unknown;
  }> = [
    {
      foo: "bar",
    },
    {
      list: ["foo", "bar"],
    },
  ]
) {
  return `# How to respond to this prompt
  
## Output schema
The output structure must be a valid JSON object with this JSON schema:

${JSON.stringify(object(json, Object.keys(json), "The JSON output"))}

## Prompt
${prompt}

## Example output

${exampleOutput
  .map(
    (example) => `\`\`\`json
${JSON.stringify(example)}
\`\`\``
  )
  .join("\n\n")}
## Generate output
It is critical that you output a single valid JSON object with no markdown, extraneous text or wrappers.`;
}

/**
 *
 * @deprecated
 * Use createPromptToJson
 */
export async function promptToJson<T extends Record<string, ValueTypes>>(
  prompt: string,
  json: T,
  sendPrompt: (prompt: string) => Promise<string>
) {
  const response = await sendPrompt(createJsonPrompt(prompt, json));

  return JSON5.parse(response) as {
    [K in keyof T]: ExtractValueType<T[K]>;
  };
}

export function createPromptToJson<
  T extends Record<string, ValueTypes>,
>(params: {
  schema: T;
  sendPrompt: (prompt: string) => Promise<string>;
  examples?: Array<{ [key: string]: unknown }>;
}) {
  return async (prompt: string) => {
    const response = await params.sendPrompt(
      createJsonPrompt(prompt, params.schema, params.examples)
    );

    return JSON5.parse(response) as {
      [K in keyof T]: ExtractValueType<T[K]>;
    };
  };
}
