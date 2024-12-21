import { Router } from "express";
import { getPrices, getSortedPricesList } from "../controllers/priceController";

const router = Router();

router.get("/", getPrices);

router.get("/sorted", getSortedPricesList);

export default router;
