import express from "express";
import cors from "cors";
import menuRoutes from "./routes/menuRoutes.js";
import reservaRoutes from "./routes/reservaRoutes.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:5173" }));
app.use(express.json());

app.use("/api/menu", menuRoutes);
app.use("/api/reserva", reservaRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
