import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

interface AuthenticatedRequest extends Request {
  user?: {
    userId: number;
  };
}

export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Token não fornecido" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: number;
      userId: number;
    };
    console.log("Decoded token:", decoded);
    req.user = { userId: decoded.id };
    next();
  } catch (err) {
    res.status(403).json({ message: "Token inválido" });
  }
};
