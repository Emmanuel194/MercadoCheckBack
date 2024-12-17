import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import listRoutes from "./routes/listRoutes";
import dotenv from "dotenv";
// import { authenticateToken } from "./middlewares/authMiddleware";
// mport { validateSignup } from "./middlewares/validationMiddleware";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
// app.use(authenticateToken);
app.use("/api", listRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor Aberto na porta: ${PORT}`);
});
