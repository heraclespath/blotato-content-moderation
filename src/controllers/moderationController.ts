import { Request, Response } from "express";
import { moderateContent } from "../services/moderationService";
import { ContentInput } from "../types/content";

export async function handleModeration(req: Request, res: Response) {
  try {
    const content: ContentInput = req.body;

    // Validate input
    if (!content.text && !content.images && !content.links) {
      return res.status(400).json({ error: "No content provided." });
    }

    // If text exists but is empty or only whitespace
    if (content.text && content.text.trim().length === 0) {
      return res.status(400).json({ error: "Text content cannot be empty." });
    }

    const result = await moderateContent(content);
    return res.json(result);
  } catch (err) {
    console.error("Moderation error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
