import { Request, Response } from "express";
import { createList, getUserLists } from "../models/listModel";

interface AuthenticatedRequest extends Request {
  user?: {
    userId: number;
  };
}

export const addList = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const { name, items } = req.body;

  if (!req.user) {
    res.status(401).json({ message: "Usuário não autenticado" });
    return;
  }

  console.log("Received user ID:", req.user.userId);
  console.log("Received list name:", name);
  console.log("Received items:", items);

  const userId = req.user.userId;

  try {
    const newList = { user_id: userId, name, items: JSON.stringify(items) };
    await createList(newList);
    res.status(201).json({ message: "Lista criada com sucesso" });
  } catch (err) {
    console.error("Erro ao criar lista:", err);
    res.status(500).json({ message: "Erro ao criar a lista" });
  }
};

export const fetchUserLists = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ message: "Usuário não autenticado" });
    return;
  }

  const userId = req.user.userId;

  try {
    const lists = await getUserLists(userId);
    res.status(200).json(lists);
  } catch (err) {
    console.error("Erro ao buscar listas do usuário:", err);
    res.status(500).json({ message: "Erro ao buscar as listas do usuário" });
  }
};
