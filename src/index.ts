import { ArraySchema, ExtractValueType, ObjectSchema } from "./schema";

import { anyOf, string, array, boolean, object, enums } from "./schema";

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
  json: ObjectSchema<any, any> | ArraySchema<any>
) {
  return `# How to respond to this prompt
  
## Output schema
The output structure must be a valid JSON object with this JSON schema:

${JSON.stringify(json)}

## Prompt
${prompt}

## Example output

\`\`\`json
{
"foo": "bar"
}
\`\`\`

\`\`\`json
{
"list": ["foo", "bar"]
}
\`\`\`

## Generate output
It is critical that you output a single valid JSON object with no markdown, extraneous text or wrappers.`;
}

export async function promptToJson<
  T extends ObjectSchema<any, any> | ArraySchema<any>,
>(prompt: string, json: T, sendPrompt: (prompt: string) => Promise<string>) {
  const response = await sendPrompt(createJsonPrompt(prompt, json));

  return JSON.parse(response) as ExtractValueType<T>;
}
