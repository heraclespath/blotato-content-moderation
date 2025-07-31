import { ContentInput, ModerationResult } from "../types/content";
import { checkTextContent } from "../utils/textChecks";
import { checkAIContent } from "../utils/aiModeration";

/**
 * Main moderation logic combining manual checks and AI checks
 */
export async function moderateContent(content: ContentInput): Promise<ModerationResult> {
  let reasons: string[] = [];

  // Handle empty or whitespace-only text
  if (!content.text || content.text.trim().length === 0) {
    return {
      safe: true,  // Empty or whitespace-only text is considered safe
      reasons: [],
    };
  }

  if (content.text) {
    // Manual checks
    const manualReasons = checkTextContent(content.text);
    if (manualReasons.length > 0) {
      reasons.push(...manualReasons);  // Add only non-empty results
    }

    // AI moderation
    const aiReasons = await checkAIContent(content.text);
    if (aiReasons.length > 0) {
      reasons.push(...aiReasons);  // Add only non-empty results
    }
  }

  // If reasons array is empty, content is safe
  const isSafe = reasons.length === 0;

  return {
    safe: isSafe,
    reasons,
  };
}
