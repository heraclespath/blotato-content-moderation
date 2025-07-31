import { moderateContent } from "../src/services/moderationService";

// Mock OpenAI moderation to simulate AI response
jest.mock("../src/utils/aiModeration", () => ({
  checkAIContent: jest.fn().mockResolvedValue(["AI flagged category: violence"]), // Mock AI flagging violence
}));

describe("Moderation Service", () => {

  // Manual check: Hate speech
  it("should flag hate speech", async () => {
    const result = await moderateContent({ text: "I hate everyone." });
    expect(result.safe).toBe(false);
    expect(result.reasons).toContain("Contains banned word: hate");
  });

  // Manual check: Violence (contains "kill")
  it("should flag violence", async () => {
    const result = await moderateContent({ text: "I will kill you!" });
    expect(result.safe).toBe(false);
    expect(result.reasons).toContain("Contains banned word: kill");
  });

  // Manual check: Spam detection (contains "buy now" and multiple links)
  it("should flag spam", async () => {
    const result = await moderateContent({
      text: "Buy now! Get it free! http://a.com http://b.com http://c.com http://d.com"
    });
    expect(result.safe).toBe(false);
    expect(result.reasons).toContain("Too many links (possible spam)");
  });

  // Manual check: Text too long
  it("should flag text too long", async () => {
    const longText = "x".repeat(501);
    const result = await moderateContent({ text: longText });
    expect(result.safe).toBe(false);
    expect(result.reasons).toContain("Text too long");
  });

  // Manual check: Empty string (valid empty content)
  it("should handle empty text", async () => {
    const result = await moderateContent({ text: "" });
    expect(result.safe).toBe(true); // No flags expected for empty content
    expect(result.reasons).toEqual([]);
  });

  // Manual check: Text with just spaces (valid empty content)
  it("should handle text with just spaces", async () => {
    const result = await moderateContent({ text: "    " });
    expect(result.safe).toBe(true); // No flags expected for just spaces
    expect(result.reasons).toEqual([]);
  });

  // Combination of manual and AI flags (e.g., hate + AI flagged for violence)
  it("should flag a combination of issues", async () => {
    const result = await moderateContent({
      text: "I hate you! I will kill you!"
    });
    expect(result.safe).toBe(false);
    expect(result.reasons).toContain("Contains banned word: hate");
    expect(result.reasons).toContain("Contains banned word: kill");
    expect(result.reasons).toContain("AI flagged category: violence");
  });
});
