import { AnalyzerInput, OpportunityReport, Score } from "@/types/report";

const scoreLabels = [
  "Pain intensity",
  "Frequency",
  "Urgency",
  "Willingness to pay",
  "Searchability",
  "Build simplicity",
  "Trust/liability safety"
] as const;

function clampScore(value: number) {
  return Math.max(1, Math.min(5, value));
}

function scoreBand(total: number) {
  if (total >= 30) return "Strong idea";
  if (total >= 24) return "Worth testing";
  if (total >= 18) return "Maybe content, weak app";
  return "Skip";
}

function extractUsefulPhrases(text: string) {
  const sentences = text
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length > 24);

  const painWords = [
    "hate",
    "annoying",
    "frustrating",
    "manual",
    "expensive",
    "slow",
    "confusing",
    "waste",
    "hard",
    "stuck",
    "need",
    "wish",
    "problem"
  ];

  const matches = sentences.filter((sentence) =>
    painWords.some((word) => sentence.toLowerCase().includes(word))
  );

  return (matches.length ? matches : sentences).slice(0, 4);
}

function inferCorePain(text: string, niche: string) {
  const lower = text.toLowerCase();
  if (lower.includes("invoice") || lower.includes("quote") || lower.includes("deposit")) {
    return `${niche || "This market"} is losing time turning messy customer requests into quotes, invoices, payment terms, and follow-ups.`;
  }
  if (lower.includes("review") || lower.includes("rating")) {
    return `${niche || "This market"} is struggling to understand repeated complaints across reviews and turn them into product fixes.`;
  }
  if (lower.includes("follow up") || lower.includes("follow-up")) {
    return `${niche || "This market"} needs a simpler way to keep conversations moving after the first customer message.`;
  }
  return `${niche || "This market"} shows repeated signs of manual work, unclear next steps, and avoidable back-and-forth that could become a focused workflow tool.`;
}

export function calculateOpportunityScore(input: AnalyzerInput): Score[] {
  const text = input.pastedText.toLowerCase();
  const lengthBoost = input.pastedText.length > 1200 ? 1 : 0;
  const paySignals = ["pay", "paid", "invoice", "deposit", "client", "customer", "business"];
  const urgencySignals = ["urgent", "asap", "deadline", "today", "missed", "late", "lost"];
  const frequencySignals = ["always", "every", "again", "constantly", "repeat", "daily", "weekly"];
  const complexitySignals = ["enterprise", "compliance", "medical", "legal", "bank", "insurance"];

  return scoreLabels.map((label) => {
    let value = 3;
    let note = "Moderate signal in the pasted text.";

    if (label === "Pain intensity") {
      value = 3 + Number(/hate|frustrat|annoy|waste|stuck|impossible/.test(text)) + lengthBoost;
      note = "Looks strongest when users describe frustration, wasted time, or blocked work.";
    }
    if (label === "Frequency") {
      value = 2 + Number(frequencySignals.some((word) => text.includes(word))) + lengthBoost;
      note = "Repeated language suggests this is not a one-off complaint.";
    }
    if (label === "Urgency") {
      value = 2 + Number(urgencySignals.some((word) => text.includes(word))) + Number(text.includes("need"));
      note = "Higher if the pain delays revenue, customer response, or deadlines.";
    }
    if (label === "Willingness to pay") {
      value = 2 + Number(paySignals.some((word) => text.includes(word))) + Number(input.goal.includes("app"));
      note = "Business, money, or customer workflow language raises the payment signal.";
    }
    if (label === "Searchability") {
      value = input.niche ? 4 : 3;
      note = "A named niche makes the problem easier to find and validate.";
    }
    if (label === "Build simplicity") {
      value = 4 - Number(complexitySignals.some((word) => text.includes(word)));
      note = "Manual text workflows are usually good V1 targets.";
    }
    if (label === "Trust/liability safety") {
      value = 5 - Number(complexitySignals.some((word) => text.includes(word)));
      note = "Safer when the app drafts operational text instead of giving regulated advice.";
    }

    return { label, value: clampScore(value), note };
  });
}

export function generateMockReport(input: AnalyzerInput): OpportunityReport {
  const niche = input.niche.trim() || "the pasted market";
  const phrases = extractUsefulPhrases(input.pastedText);
  const scores = calculateOpportunityScore(input);
  const totalScore = scores.reduce((sum, score) => sum + score.value, 0);
  const shortNiche = niche.replace(/^the\s+/i, "");
  const ideaName = shortNiche.toLowerCase().includes("service")
    ? "QuickQuote Builder"
    : "Complaint-to-Workflow Mapper";

  return {
    niche,
    sourceType: input.sourceType,
    goal: input.goal,
    painSummary: inferCorePain(input.pastedText, niche),
    repeatedPainSignals: [
      "Users describe the same work happening repeatedly, usually after a customer or community member asks for help.",
      "The painful step is not discovery. It is converting messy language into a clear next action.",
      "People want a simple output they can send, test, or build from without opening five separate tools.",
      "The best opportunity is a narrow assistant that turns pasted text into a finished business artifact."
    ],
    exactUserLanguage:
      phrases.length > 0
        ? phrases
        : [
            "I keep rewriting the same thing for every customer.",
            "I wish there was a faster way to turn this into something usable.",
            "The hard part is knowing what to send next."
          ],
    appIdeas: [
      {
        name: ideaName,
        audience: `Solo builders serving ${niche}`,
        promise: "Paste messy customer or community text and get a clean action plan.",
        firstVersion: "Textarea in, structured report out, with copy buttons for the highest-value outputs."
      },
      {
        name: "Pain Signal Library",
        audience: "Indie hackers collecting market research",
        promise: "Save repeated complaints and cluster them into idea themes.",
        firstVersion: "Local library of pasted snippets grouped by pain, audience, urgency, and monetization angle."
      },
      {
        name: "Validation Post Writer",
        audience: "Founders testing demand in communities",
        promise: "Turn observed complaints into non-spammy validation posts.",
        firstVersion: "Generate three community post drafts and a short interview script."
      }
    ],
    bestIdeaRecommendation: `${ideaName} is the best V1 because it can start as a pasted-text workflow and deliver a concrete artifact immediately. Build the narrowest version around one repeated job, not a broad research dashboard.`,
    landingPageWedge: `Paste messy ${niche} complaints. Get a ranked app idea, MVP scope, validation post, and Codex build prompt in one report.`,
    targetUser: `Solo founders, Codex users, and small SaaS builders researching ${niche}.`,
    scores,
    totalScore,
    scoreLabel: scoreBand(totalScore),
    whyThisMightFail: [
      "The pasted complaints may be loud but not tied to a budget.",
      "Users may prefer a template or spreadsheet if the workflow is too simple.",
      "A broad idea generator could feel generic unless the output stays specific to the pasted language.",
      "The product needs proof that people will paste real research instead of expecting automatic scraping."
    ],
    mvpFeatureList: [
      "Paste text form with source type, niche, and goal.",
      "Opportunity report with pain summary, repeated signals, exact language, and scored app ideas.",
      "Copy buttons for the landing page wedge, validation post, and Codex build prompt.",
      "Markdown export for saving or sharing the report.",
      "Sample report that shows the quality bar before signup or payment exists."
    ],
    pricingModel:
      "Start free for a few reports per month. Charge $9-$19/month once users want saved reports, stronger generation, and Build Packs.",
    redditValidationPost: `I am testing a tiny tool for people researching ${niche}. You paste a messy thread, review dump, or customer conversation, and it returns the repeated pain signals, app ideas, MVP scope, and a build prompt. If you research ideas this way, what would make the report useful enough to use twice?`,
    codexBuildPrompt: `Build a focused MVP called ${ideaName}. It should accept pasted ${niche} complaints, identify repeated pain signals, extract exact user language, score the opportunity from 1 to 5 across seven criteria, recommend one buildable app idea, and produce a landing page wedge, validation post, MVP feature list, pricing model, and markdown export. Use Next.js App Router, TypeScript, Tailwind CSS, local state only, no database, no login, and no external APIs in V1.`
  };
}

export const sampleReport: OpportunityReport = {
  niche: "small business service owners",
  sourceType: "Reddit-style discussion",
  goal: "Find app ideas",
  painSummary:
    "Solo service owners are buried in message-based sales work. Customers send vague requests, owners manually turn them into quotes, then chase approval, invoices, deposits, scheduling details, and follow-ups.",
  repeatedPainSignals: [
    "Customer messages arrive in messy language and require interpretation before a quote can be sent.",
    "Owners lose time rewriting scope, payment terms, timelines, and follow-up messages.",
    "Deposits and invoice steps are often forgotten until after the customer has cooled off.",
    "The pain connects directly to revenue because slow replies can lose jobs."
  ],
  exactUserLanguage: [
    "I get the job details in texts but then I have to rewrite everything into a real quote.",
    "Customers disappear when I take too long to send pricing.",
    "I need something that turns the message into a clean scope and payment terms.",
    "I am tired of copying the same follow-up from old jobs."
  ],
  appIdeas: [
    {
      name: "QuickQuote Builder",
      audience: "Solo service businesses",
      promise:
        "Paste a customer message and get a quote, scope of work, payment terms, and follow-up text.",
      firstVersion:
        "A single form that produces a quote draft, terms, deposit note, and SMS/email follow-up."
    },
    {
      name: "Deposit Nudge",
      audience: "Home service operators",
      promise: "Turn approved quotes into deposit request messages and reminders.",
      firstVersion: "Generate payment request copy, reminder copy, and a simple status checklist."
    },
    {
      name: "Scope Cleaner",
      audience: "Freelancers and tradespeople",
      promise: "Convert vague job requests into clean scope bullets and missing-question lists.",
      firstVersion: "Paste a request, get scope, assumptions, exclusions, and clarifying questions."
    }
  ],
  bestIdeaRecommendation:
    "QuickQuote Builder is the strongest idea because the pain is frequent, tied to revenue, and narrow enough for a simple V1. It does not need deep integrations at first. The first product can prove value with pasted customer messages and copy-ready outputs.",
  landingPageWedge:
    "Paste a customer message. Get a clean quote, scope of work, payment terms, and follow-up text.",
  targetUser: "Solo service businesses",
  scores: [
    {
      label: "Pain intensity",
      value: 5,
      note: "Owners describe the work as frustrating and repetitive."
    },
    {
      label: "Frequency",
      value: 5,
      note: "The workflow happens every time a new lead asks for pricing."
    },
    {
      label: "Urgency",
      value: 5,
      note: "Slow quotes can cost jobs."
    },
    {
      label: "Willingness to pay",
      value: 4,
      note: "The output connects to booked revenue and deposits."
    },
    {
      label: "Searchability",
      value: 4,
      note: "The audience is easy to find in trade, freelancer, and small business communities."
    },
    {
      label: "Build simplicity",
      value: 4,
      note: "V1 can be a text-in, text-out workflow."
    },
    {
      label: "Trust/liability safety",
      value: 4,
      note: "The app drafts business documents but should avoid legal claims."
    }
  ],
  totalScore: 31,
  scoreLabel: "Strong idea",
  whyThisMightFail: [
    "Some service owners may already have quoting software and resist another tool.",
    "The quote output must feel specific to the job or users will treat it as a generic template.",
    "Payments and invoicing integrations may become expected after the first version.",
    "The tool should avoid positioning itself as legal contract software."
  ],
  mvpFeatureList: [
    "Textarea for pasted customer message.",
    "Inputs for service type, location, rough price range, and deposit preference.",
    "Generated quote summary with scope of work, assumptions, exclusions, timeline, and payment terms.",
    "Copy buttons for quote, SMS follow-up, invoice note, and deposit request.",
    "Markdown export for the full quote packet."
  ],
  pricingModel:
    "Free for 3 quote packets per month. Starter at $9/month for 25 packets. Builder at $19/month for unlimited packets and reusable service templates. One-time packet at $5.",
  redditValidationPost:
    "I am testing a small tool for solo service business owners. You paste a messy customer text or email, and it turns it into a clean quote, scope of work, payment terms, deposit request, and follow-up message. If you quote jobs from texts or DMs, what would this need to include before you would trust it?",
  codexBuildPrompt:
    "Build a Next.js App Router MVP called QuickQuote Builder for solo service businesses. The app should let a user paste a customer message, enter service type, price range, timeline, and deposit preference, then generate a quote packet with scope of work, assumptions, exclusions, payment terms, deposit request, and follow-up text. Use TypeScript, Tailwind CSS, local state only, no database, no auth, and no payment integration in V1. Include copy buttons and markdown export."
};

export function reportToMarkdown(report: OpportunityReport) {
  const scores = report.scores
    .map((score) => `- ${score.label}: ${score.value}/5 - ${score.note}`)
    .join("\n");
  const ideas = report.appIdeas
    .map(
      (idea, index) =>
        `${index + 1}. ${idea.name}\n   - Audience: ${idea.audience}\n   - Promise: ${idea.promise}\n   - V1: ${idea.firstVersion}`
    )
    .join("\n");

  return `# PainMiner Opportunity Report

## Pain Summary
${report.painSummary}

## Repeated Pain Signals
${report.repeatedPainSignals.map((item) => `- ${item}`).join("\n")}

## Exact User Language
${report.exactUserLanguage.map((item) => `- "${item}"`).join("\n")}

## Top 3 App Ideas
${ideas}

## Best Idea Recommendation
${report.bestIdeaRecommendation}

## Landing Page Wedge
${report.landingPageWedge}

## Target User
${report.targetUser}

## Opportunity Score
${report.totalScore}/35 - ${report.scoreLabel}

${scores}

## Why This Might Fail
${report.whyThisMightFail.map((item) => `- ${item}`).join("\n")}

## MVP Feature List
${report.mvpFeatureList.map((item) => `- ${item}`).join("\n")}

## Pricing Model
${report.pricingModel}

## Reddit Validation Post
${report.redditValidationPost}

## Codex Build Prompt
${report.codexBuildPrompt}
`;
}
