export type AnalyzerInput = {
  topic: string;
  threadText: string;
};

export type IdeaResult = {
  topic: string;
  mainPain: string;
  appIdea: string;
  targetUser: string;
  firstFeature: string;
  whyItCouldWork: string;
  whyItMightFail: string;
  opportunityScore: number;
  scoreExplanation: string;
  nextTest: string;
};
