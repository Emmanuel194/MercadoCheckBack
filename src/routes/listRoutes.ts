import { Router } from "express";
import { addList, fetchUserLists } from "../controllers/listController";
import {
  validateListCreationChecks,
  validateListCreation,
} from "../middleware/validateList";
import { authenticateToken } from "../middleware/authenticateToken";

const router = Router();

router.post(
  "/lists",
  authenticateToken,
  validateListCreationChecks,
  validateListCreation,
  addList
);

router.get("/lists", authenticateToken, fetchUserLists);

export default router;
