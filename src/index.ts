import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import listRoutes from "./routes/listRoutes";
import priceRoutes from "./routes/princeRoutes";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/api", listRoutes);
app.use("/api/prices", priceRoutes);

const apiKey = process.env.GOOGLE_API_KEY;

app.get("/api/nearby-markets", async (req, res) => {
  const { latitude, longitude } = req.query;
  console.log(`Recebido: latitude=${latitude}, longitude=${longitude}`);
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1500&type=supermarket&key=${apiKey}`;
  console.log("URL da Requisição:", url);
  try {
    const response = await axios.get(url);
    console.log("Resposta da API:", response.data);
    res.json(response.data.results);
  } catch (error) {
    console.error("Erro ao buscar mercados próximos:", error);
    res.status(500).send("Erro ao buscar mercados próximos");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor Aberto na porta: ${PORT}`);
});
