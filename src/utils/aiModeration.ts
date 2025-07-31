import OpenAI from "openai";
import "dotenv/config";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Uses OpenAI Moderation API to detect problematic content.
 * Returns an array of reasons if flagged.
 */
export async function checkAIContent(text: string): Promise<string[]> {
  const reasons: string[] = [];

  try {
    const response = await openai.moderations.create({
      model: "omni-moderation-latest",
      input: text,
    });

    const result = response.results[0];

    if (result.flagged) {
      const flaggedCategories = Object.entries(result.categories)
        .filter(([_, value]) => value === true)
        .map(([category]) => category);

      reasons.push(...flaggedCategories.map((cat) => `AI flagged category: ${cat}`));
    }
  } catch (error) {
    console.error("OpenAI moderation error:", error);
    reasons.push("AI moderation failed (fallback safe mode)");
  }

  return reasons;
}
