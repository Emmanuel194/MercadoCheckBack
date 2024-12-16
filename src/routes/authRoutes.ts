import { Router, Request, Response } from "express";
import { register, login } from "../controllers/authController";
import { validateSignup } from "../middleware/validationMiddleware";
import { RequestHandler } from "express";

const router = Router();

router.post(
  "/signup",
  validateSignup as RequestHandler[],
  register as RequestHandler
);
router.post("/login", login as RequestHandler);

export default router;
