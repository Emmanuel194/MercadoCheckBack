import { Request, Response } from "express";
import {
  createList,
  getUserLists,
  inactivateList,
  updateList,
} from "../models/listModel";

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

  const userId = req.user.userId;

  try {
    const newList = { user_id: userId, name, items: JSON.stringify(items) };
    const result: any = await createList(newList);

    res.status(201).json({
      id: result.insertId,
      user_id: userId,
      name,
      items,
    });
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

export const editList = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const { id, name, items } = req.body;

  if (!req.user) {
    res.status(401).json({ message: "Usuário não autenticado" });
    return;
  }

  try {
    await updateList(id, name, JSON.stringify(items));
    res.status(200).json({ message: "Lista atualizada com sucesso" });
  } catch (err) {
    console.error("Erro ao atualizar lista:", err);
    res.status(500).json({ message: "Erro ao atualizar a lista" });
  }
};

export const deleteList = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  if (!req.user) {
    res.status(401).json({ message: "Usuário não autenticado" });
    return;
  }

  try {
    await inactivateList(Number(id));
    res.status(200).json({ message: "Lista inativada com sucesso" });
  } catch (err) {
    console.error("Erro ao inativar lista:", err);
    res.status(500).json({ message: "Erro ao inativar a lista" });
  }
};
