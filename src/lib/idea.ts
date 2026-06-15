import { AnalyzerInput, IdeaResult } from "@/types/idea";

function includesAny(text: string, words: string[]) {
  return words.some((word) => text.includes(word));
}

function normalizeTopic(topic: string) {
  return topic.trim() || "this community";
}

export function calculateSimpleOpportunityScore(input: AnalyzerInput) {
  const text = input.threadText.toLowerCase();
  let score = 5;

  if (includesAny(text, ["anxious", "stress", "worried", "frustrating", "hate", "tired"])) {
    score += 1;
  }
  if (includesAny(text, ["client", "customer", "paid", "charge", "price", "invoice", "deposit"])) {
    score += 1;
  }
  if (includesAny(text, ["always", "every", "again", "weekly", "daily", "constantly"])) {
    score += 1;
  }
  if (includesAny(text, ["wish", "need", "simple", "template", "tool"])) {
    score += 1;
  }
  if (includesAny(text, ["legal", "medical", "compliance", "tax", "insurance"])) {
    score -= 1;
  }

  return Math.max(1, Math.min(10, score));
}

function detectScenario(input: AnalyzerInput) {
  const text = input.threadText.toLowerCase();

  if (includesAny(text, ["price", "charge", "rate", "client", "freelance", "freelancer"])) {
    return {
      pain:
        "not knowing what to charge and feeling anxious when clients push back on price.",
      idea: "RateProof",
      target: "freelancers who quote custom work from messy client requests",
      feature:
        "a paste box that turns a client request into a fair price range and a confident reply.",
      couldWork:
        "pricing anxiety is frequent, emotional, and tied directly to getting paid.",
      mightFail:
        "pricing advice can feel too generic unless it adapts to the user, project type, and market.",
      nextTest:
        "When a client pushes back on price, what would help you reply with confidence?"
    };
  }

  if (includesAny(text, ["quote", "invoice", "deposit", "follow up", "follow-up", "lead"])) {
    return {
      pain:
        "turning messy customer messages into quotes and follow-ups.",
      idea: "QuoteReply",
      target: "solo service businesses that sell through texts, DMs, and email",
      feature:
        "a paste box that turns one customer message into a quote draft and follow-up reply.",
      couldWork:
        "the pain happens during revenue work, so a small time saver can feel valuable quickly.",
      mightFail:
        "some users may already have quoting software and only need better templates.",
      nextTest:
        "Do you lose jobs because writing quotes and follow-ups takes too long?"
    };
  }

  if (includesAny(text, ["review", "bug", "feature", "app", "rating"])) {
    return {
      pain:
        "repeated product complaints that are hard to prioritize.",
      idea: "ReviewFix",
      target: "small app teams and solo SaaS builders reading customer reviews",
      feature:
        "a paste box that turns review complaints into one prioritized product fix.",
      couldWork:
        "builders already read reviews, but they need a faster way to choose what to build next.",
      mightFail:
        "review volume may be too low for some small products.",
      nextTest:
        "What repeated review complaint would you pay to understand faster?"
    };
  }

  return {
    pain:
      "a repeated manual task with unclear next steps and no simple shortcut.",
    idea: "ThreadToTool",
    target: `solo builders exploring ${normalizeTopic(input.topic)}`,
    feature:
      "a paste box that turns one messy discussion into one clear workflow checklist.",
    couldWork:
      "the thread shows repeated friction and a narrow first workflow can be tested quickly.",
    mightFail:
      "the complaint may be interesting but not painful enough for people to pay.",
    nextTest:
      "If a small tool solved this one step, would you try it before your current workaround?"
  };
}

export function generateMockIdea(input: AnalyzerInput): IdeaResult {
  const scenario = detectScenario(input);
  const score = calculateSimpleOpportunityScore(input);

  // Future OpenAI integration point:
  // Replace this mock scenario selection with an API route that sends the same
  // AnalyzerInput shape to OpenAI and returns this IdeaResult shape.
  return {
    topic: normalizeTopic(input.topic),
    mainPain: `People are struggling with ${scenario.pain}`,
    appIdea: `Build ${scenario.idea}.`,
    targetUser: `This is for ${scenario.target}.`,
    firstFeature: `The first feature should be ${scenario.feature}`,
    whyItCouldWork: `Because ${scenario.couldWork}`,
    whyItMightFail: `Because ${scenario.mightFail}`,
    opportunityScore: score,
    scoreExplanation:
      score >= 8
        ? "Worth testing because the pain is specific, repeated, and close to money or urgent work."
        : score >= 6
          ? "Worth a small test because the pain is clear, but willingness to pay is still uncertain."
          : "Weak until the thread shows more urgency, repetition, or budget.",
    nextTest: `Post this question in the same community: ${scenario.nextTest}`
  };
}

export const exampleResult: IdeaResult = {
  topic: "freelancers",
  mainPain:
    "People are struggling with pricing freelance work and feel anxious when clients push back on price.",
  appIdea: "Build RateProof.",
  targetUser: "This is for freelancers who quote custom work from vague job requests.",
  firstFeature:
    "The first feature should be a paste box that turns a job request into a fair price range and a confident reply to the client.",
  whyItCouldWork:
    "Because pricing anxiety is frequent, emotional, and tied directly to getting paid.",
  whyItMightFail:
    "Because price guidance can feel generic unless it reflects the project type, client context, and freelancer experience level.",
  opportunityScore: 8,
  scoreExplanation:
    "Worth testing because the pain is specific, repeated, and connected to income.",
  nextTest:
    "Post this question in the same community: When a client pushes back on price, what would help you reply with confidence?"
};
