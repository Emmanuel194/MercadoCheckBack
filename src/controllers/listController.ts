import { Request, Response } from "express";
import { createList, getUserLists } from "../models/listModel";

export const addList = async (req: Request, res: Response) => {
  const { user_id, name, items } = req.body;

  try {
    const newList = { user_id, name, items: JSON.stringify(items) };
    await createList(newList);
    res.status(201).json({ message: "Lista criada com sucesso" });
  } catch (err) {
    console.error("Erro ao criar lista:", err);
    res.status(500).json({ message: "Erro ao criar a lista" });
  }
};

export const fetchUserLists = async (req: Request, res: Response) => {
  const user_id = req.params.user_id;

  try {
    const lists = await getUserLists(parseInt(user_id, 10));
    res.status(200).json(lists);
  } catch (err) {
    console.error("Erro ao buscar listas do usuário:", err);
    res.status(500).json({ message: "Erro ao buscar as listas do usuário" });
  }
};
