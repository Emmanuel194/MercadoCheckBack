import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

export const validateSignup = [
  check("name").not().isEmpty().withMessage("Nome é obrigatório"),
  check("email")
    .isEmail()
    .withMessage("E-mail inválido")
    .not()
    .isEmpty()
    .withMessage("E-mail é obrigatório"),
  check("dob").not().isEmpty().withMessage("Data de nascimento é obrigatória"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Senha deve ter pelo menos 6 caracteres")
    .not()
    .isEmpty()
    .withMessage("Senha é obrigatória"),
  check("confirmPassword")
    .not()
    .isEmpty()
    .withMessage("Confirmação de senha é obrigatória")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("As senhas não coincidem"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Erros de validação:", errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
