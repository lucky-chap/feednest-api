
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
