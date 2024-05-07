# prompt-to-json

Prompt LLMs with structured and reliable JSON response

## Example

```ts
import { promptToJson, schema } from "prompt-to-json";

const wordsRhyming = await promptToJson(
  "Give me 5 words rhyming with cool",
  schema.array(
    schema.string("A word that rhymes"),
    "A list of words that rhymes"
  ),
  (prompt) => someLLM.addMessage(prompt)
);
```

## Why?

There are different kinds of LLM primitives:

- **Chat**: Conversational, human to LLM
- **Assistant**: Conversational, human to LLM with tools
- **Agents**: Conversational, human to LLM, LLM to LLM, with tools

**prompt-to-json** gives a lower level primitive that allows you to integrate LLMs in your existing application in a more targeted way. Send information to the LLM and get a predictable JSON response to populate your application state.
