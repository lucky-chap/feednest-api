import { models, collections } from "@hypermode/modus-sdk-as";

import {
  OpenAIChatModel,
  SystemMessage,
  UserMessage,
} from "@hypermode/modus-sdk-as/models/openai/chat";
import { modelName } from "./utils";
import { AnalyseSentimentResponse, SummaryResponse } from "./types";

export function sayHello(name: string | null = null): string {
  return `Hello, ${name || "World"}!`;
}

export function analyseSentiment(text: string): AnalyseSentimentResponse {
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

  const sentiment = output.choices[0].message.content.trim();

  const messageInput = model.createInput([
    new SystemMessage("You are a great smart reply agent."),
    new UserMessage(
      `Based on this sentiment ${sentiment}, generate a smart reply to the following text: "${text}" in less than 20 words.
        If the text is positive, return a smart reply showing positivity and gratitude, if it is neutral, return a smart reply
        showing neutrality and understanding, and if it is negative, return a smart reply about how sorry you are and that 
        the issue would be looked at and fixed.
        Do not add your own context, comment or an explanation, return a smart reply in less than 20 words. Just return a string
        less than 20 words, no weird formatting`,
    ),
  ]);
  messageInput.temperature = 0.7;
  const messageOutput = model.invoke(messageInput);

  return {
    message: messageOutput.choices[0].message.content.trim(),
    sentiment,
  };
}

export function summariseFeedback(feedback: string[]): SummaryResponse {
  const model = models.getModel<OpenAIChatModel>(modelName);
  const input = model.createInput([
    new SystemMessage("You are a great feedback summarisation agent."),
    new UserMessage(
      `Summarise the following feedback: "${feedback}" in less than 100 words. Do not add your own context, comment or an explanation,
      return a summary in less than 100 words. Just return a string less than 100 words, no weird formatting`,
    ),
  ]);

  input.temperature = 0.7;
  const output = model.invoke(input);

  const summary = output.choices[0].message.content.trim();

  const suggestionsInput = model.createInput([
    new SystemMessage("You are a great feedback suggestions agent."),
    new UserMessage(
      `Based on this summary: "${summary}", generate a smart suggestions on how to improve the product
      based on the summary in less than 100 words. Be elaborate and detailed. Do not add your own context, comment or an explanation,
      Return smart suggestions in less than 100 words. Just return the suggestions in string less than 100 words, no weird formatting.`,
    ),
  ]);

  suggestionsInput.temperature = 0.7;
  const messageOutput = model.invoke(suggestionsInput);

  return {
    suggestions: messageOutput.choices[0].message.content.trim(),
    summary,
  };
}
