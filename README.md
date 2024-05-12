# prompt-to-json

Prompt LLMs with structured and reliable JSON response

## Example

```ts
import { createPromptToJson, schema } from "prompt-to-json";

const promptRhymes = createPromptToJson({
  schema: schema.array(
    schema.string("A word that rhymes"),
    "A list of words that rhymes"
  ),
  sendPrompt: (prompt) => someLLM.completion.create(prompt),
  // Optionally add for more complex expectations of JSON response
  examples: [{ rhymes: ["ice", "spice"] }],
});

const { rhymes } = await promptRhymes("Give me 5 words rhyming with cool");
```

## Why?

There are different kinds of LLM primitives:

- **Chat**: Conversational, human to LLM
- **Assistant/Agent**: Conversational, human to LLM with tools
- **Agentic worfklow**: Conversational, human to LLM, LLM to LLM, with tools

**prompt-to-json** gives a lower level primitive that allows you to integrate LLMs in your existing application in a more targeted way. Send information to the LLM and get a predictable JSON response to populate your application state. You'll treat an LLM more like a way to generate data structures with values, than a conversation. I wonder if this low level abstraction could result in a different type of architecture than agentic workflows to do more complex tasks where LLMs is just one of many types of "functions".
