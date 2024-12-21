import { Request, Response } from "express";
import { getAllPrices, getSortedPrices } from "../service/priceService";

export const getPrices = (req: Request, res: Response) => {
  try {
    const prices = getAllPrices();
    res.json(prices);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter preços" });
  }
};

export const getSortedPricesList = (req: Request, res: Response) => {
  try {
    const { order, page, limit } = req.query;
    const sortedPrices = getSortedPrices(order as "asc" | "desc");
    res.json(sortedPrices);
  } catch (error) {
    res.status(500).json({ error: "Erro ao ordenar preços" });
  }
};
