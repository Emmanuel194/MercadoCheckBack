import { Router } from "express";
import { addList, fetchUserLists } from "../controllers/listController";
import {
  validateListCreationChecks,
  validateListCreation,
} from "../middleware/validateList";

const router = Router();

router.post(
  "/lists",
  validateListCreationChecks,
  validateListCreation,
  addList
);

router.get("/lists/:user_id", fetchUserLists);

export default router;
