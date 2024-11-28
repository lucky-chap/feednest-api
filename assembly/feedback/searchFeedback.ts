import { collections } from "@hypermode/modus-sdk-as";
import { feedbackSearchMethod } from "../utils";

export function search(
  text: string,
  collection: string,
  maxItems: i32,
  projectId: string,
): collections.CollectionSearchResult {
  const response = collections.search(
    collection,
    feedbackSearchMethod,
    text, // text to search for
    maxItems,
    true,
    [projectId], // namespace to search from
  );
  return response;
}
