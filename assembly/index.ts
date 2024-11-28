import { models, collections } from "@hypermode/modus-sdk-as";

import {
  OpenAIChatModel,
  SystemMessage,
  UserMessage,
} from "@hypermode/modus-sdk-as/models/openai/chat";
import { modelName } from "./utils";

export function sayHello(name: string | null = null): string {
  return `Hello, ${name || "World"}!`;
}

export function analyseSentiment(text: string): string {
  const model = models.getModel<OpenAIChatModel>(modelName);
  const input = model.createInput([
    new SystemMessage("You are a great feedback sentiment analysis agent."),
    new UserMessage(
      `Analyse the sentiment of the following text: "${text}" If it is positive, return "positive",
      if it is neutral, return "neutral", and if it is negative, return "negative". Do not add your own context, comment
      or an explanation, return either positive, neutral or negative. Just either of those words`,
    ),
  ]);

  input.temperature = 0.7;
  const output = model.invoke(input);
  return output.choices[0].message.content.trim();
}
