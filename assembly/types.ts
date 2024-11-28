import { collections } from "@hypermode/modus-sdk-as";


@json
export class AnalyseSentimentResponse {

  @alias("sentiment")
  sentiment!: string;


  @alias("message")
  message!: string;
}


@json
export class SummaryResponse {

  @alias("summary")
  summary!: string;


  @alias("suggestions")
  suggestions!: string;
}


@json
export class EmbedFeedbackResponse {

  @alias("feedbackCollectionMutationResult")
  feedbackCollectionMutationResult: collections.CollectionMutationResult | null =
    null;
}
