import express from "express"
import "dotenv/config"
import authRoutes from "./routes/authRoutes.js"
import { connectDB } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT || 3000

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log("Server está rodando na porta 3000");
    // esse 3000 serve para ser o teste do aplicativo
})