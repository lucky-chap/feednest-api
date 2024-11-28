import { models } from "@hypermode/modus-sdk-as";

import { EmbeddingsModel } from "@hypermode/modus-sdk-as/models/experimental/embeddings";
import { embeddingModelName } from "../utils";

export function embed(texts: string[]): f32[][] {
  const model = models.getModel<EmbeddingsModel>(embeddingModelName);
  const input = model.createInput(texts);
  const output = model.invoke(input);
  return output.predictions;
}

export function sayHello(name: string | null = null): string {
  return `Hello, ${name || "World"}!`;
}
