import { ContentInput, ModerationResult } from "../types/content";
import { checkTextContent } from "../utils/textChecks";

/**
 * Main moderation logic of manual checks
 */
export async function moderateContent(content: ContentInput): Promise<ModerationResult> {
  let reasons: string[] = [];

  if (content.text) {
    reasons = reasons.concat(checkTextContent(content.text));
  }

  return {
    safe: reasons.length === 0,
    reasons,
  };
}
