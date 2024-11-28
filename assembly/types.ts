import { collections } from "@hypermode/modus-sdk-as";


@json
export class AnalyseSentimentResponse {

  @alias("sentiment")
  sentiment!: string;


  @alias("message")
  message!: string;


  @alias("feedbackCollectionMutationResult")
  feedbackCollectionMutationResult: collections.CollectionMutationResult | null =
    null;
}


@json
export class SummaryResponse {

  @alias("summary")
  summary!: string;


  @alias("suggestions")
  suggestions!: string;
}
