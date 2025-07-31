import { ContentInput, ModerationResult } from "../types/content";
import { checkTextContent } from "../utils/textChecks";
import { checkAIContent } from "../utils/aiModeration";

/**
 * Main moderation logic combining manual checks and AI checks
 */
export async function moderateContent(content: ContentInput): Promise<ModerationResult> {
  let reasons: string[] = [];

  if (content.text) {
    // Manual checks
    reasons = reasons.concat(checkTextContent(content.text));

    // AI moderation
    const aiReasons = await checkAIContent(content.text);
    reasons = reasons.concat(aiReasons);
  }

  return {
    safe: reasons.length === 0,
    reasons,
  };
}
