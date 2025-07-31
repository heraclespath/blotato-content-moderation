import { Router } from "express";
import { handleModeration } from "../controllers/moderationController";

const router = Router();

router.post("/", handleModeration);

export default router;
