import { Request, Response, NextFunction, RequestHandler } from "express";
import { check, validationResult, ValidationChain } from "express-validator";

export const validateListCreationChecks: ValidationChain[] = [
  check("name").not().isEmpty().withMessage("Nome da lista é obrigatório"),
  check("items").isArray().withMessage("Itens da lista devem ser um array"),
];

export const validateListCreation: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("Erros de validação:", errors.array());
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};
