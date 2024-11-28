import { collections } from "@hypermode/modus-sdk-as";

import { feedbackCollectionName } from "../utils";
import { EmbedFeedbackResponse } from "../types";

export function embedFeedback(
  stringifiedFeedback: string,
  projectId: string,
): EmbedFeedbackResponse {
  // embed feedback into collection, using the projectId as namespace for easy retrieval
  const feedbackCollectionMutationResult = collections.upsert(
    feedbackCollectionName,
    null,
    stringifiedFeedback, // stringified feedback to embed
    [], // labels
    projectId, // namespace
  );

  return {
    feedbackCollectionMutationResult: feedbackCollectionMutationResult,
  };
}
