"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { TextArea } from "@/components/TextArea";
import { generateMockIdea } from "@/lib/idea";

export default function AnalyzePage() {
  const router = useRouter();
  const [topic, setTopic] = useState("");
  const [threadText, setThreadText] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (threadText.trim().length < 300) {
      setError("Paste at least 300 characters so PainMiner has enough real signal to work with.");
      return;
    }

    const result = generateMockIdea({ topic, threadText });
    sessionStorage.setItem("painminer-result", JSON.stringify(result));
    router.push("/result");
  }

  return (
    <div className="bg-white">
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-950">Find one app idea</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-700">
            Paste one messy discussion. PainMiner will return one focused idea,
            not a dashboard.
          </p>
        </div>

        <form className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm" onSubmit={handleSubmit}>
          <Input
            label="Optional topic or subreddit"
            onChange={setTopic}
            placeholder="Example: r/freelance"
            value={topic}
          />
          <div className="mt-5">
            <TextArea
              error={error}
              label="Paste the thread, comments, reviews, or discussion"
              onChange={(value) => {
                setThreadText(value);
                if (error && value.trim().length >= 300) setError("");
              }}
              placeholder="Paste the full thread here. Include the post and a few comments if possible."
              value={threadText}
            />
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-5 text-neutral-500">
              Local state only. No database, login, Reddit API, or external API.
            </p>
            <Button type="submit">Find the app idea</Button>
          </div>
        </form>
      </section>
    </div>
  );
}
