/**
 * Basic manual text checks for problematic content.
 * Flags banned words, spammy content, or excessive length.
 */
export function checkTextContent(text: string): string[] {
  const reasons: string[] = [];
  const lower = text.toLowerCase();

  // Example banned word list (expandable)
  const bannedWords = ["spam", "scam", "kill", "hate", "nsfw"];

  for (const word of bannedWords) {
    if (lower.includes(word)) {
      reasons.push(`Contains banned word: ${word}`);
    }
  }

  // Very naive spam detection
  if ((text.match(/http/g) || []).length > 3) {
    reasons.push("Too many links (possible spam)");
  }

  if (text.length > 500) {
    reasons.push("Text too long");
  }

  return reasons;
}
