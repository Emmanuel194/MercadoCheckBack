import { Router } from "express";
import {
  addList,
  deleteList,
  editList,
  fetchUserLists,
} from "../controllers/listController";
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
router.put("/lists", authenticateToken, editList);
router.delete("/lists/:id", authenticateToken, deleteList);

export default router;
