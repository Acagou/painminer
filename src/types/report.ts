export type AnalyzerInput = {
  sourceType: string;
  niche: string;
  goal: string;
  pastedText: string;
};

export type ScoreKey =
  | "Pain intensity"
  | "Frequency"
  | "Urgency"
  | "Willingness to pay"
  | "Searchability"
  | "Build simplicity"
  | "Trust/liability safety";

export type Score = {
  label: ScoreKey;
  value: number;
  note: string;
};

export type AppIdea = {
  name: string;
  audience: string;
  promise: string;
  firstVersion: string;
};

export type OpportunityReport = {
  niche: string;
  sourceType: string;
  goal: string;
  painSummary: string;
  repeatedPainSignals: string[];
  exactUserLanguage: string[];
  appIdeas: AppIdea[];
  bestIdeaRecommendation: string;
  landingPageWedge: string;
  targetUser: string;
  scores: Score[];
  totalScore: number;
  scoreLabel: string;
  whyThisMightFail: string[];
  mvpFeatureList: string[];
  pricingModel: string;
  redditValidationPost: string;
  codexBuildPrompt: string;
};
