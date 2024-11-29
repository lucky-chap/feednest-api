import { models, collections } from "@hypermode/modus-sdk-as";

import {
  OpenAIChatModel,
  SystemMessage,
  UserMessage,
} from "@hypermode/modus-sdk-as/models/openai/chat";
import { modelName } from "../utils";
import { SummaryResponse } from "../types";

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

  // generate suggestions based on summary
  const suggestionsInput = model.createInput([
    new SystemMessage("You are a great feedback suggestions agent."),
    new UserMessage(
      `Based on this summary: "${summary}", generate smart suggestions on how to improve the product
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
