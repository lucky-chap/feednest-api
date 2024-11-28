import { models, collections } from "@hypermode/modus-sdk-as";

import {
  OpenAIChatModel,
  SystemMessage,
  UserMessage,
} from "@hypermode/modus-sdk-as/models/openai/chat";
import { feedbackCollectionName, modelName } from "../utils";
import { AnalyseSentimentResponse, SummaryResponse } from "../types";

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

  // reply based on sentiment
  const messageInput = model.createInput([
    new SystemMessage("You are a great smart reply agent."),
    new UserMessage(
      `Based on this sentiment ${sentiment}, generate a smart reply to the following text: "${text}" in less than 25 words.
          If the text is positive, return a smart reply showing positivity and gratitude, if it is neutral, return a smart reply
          showing neutrality and understanding, and if it is negative, return a smart reply about how sorry you are and that 
          the issue would be looked at and fixed. Do not ask follow-up questions.
          Do not add your own context, comment or an explanation, return a smart reply in less than 25 words. Just return a string
          less than 25 words, no weird formatting`,
    ),
  ]);
  messageInput.temperature = 0.7;
  const messageOutput = model.invoke(messageInput);

  return {
    message: messageOutput.choices[0].message.content.trim(),
    sentiment,
  };
}
