import express from 'express';
import cors from 'cors';
import guessRoutes from './routes/guess.routes.js';
import menuRoutes from './routes/menu.routes.js';
import reservaRoutes from './routes/reserva.routes.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173' }));
app.use(express.json());

// Ruta de prueba para verificar que la API está viva
app.get('/api/health', (req, res) => {
  res.json({ estado: 'ok' });
});

// Ejercicio 1: Adivina el Número
app.use('/', guessRoutes);

// Caso de negocio: Food DEI
app.use('/api/menu', menuRoutes);
app.use('/api/reserva', reservaRoutes);

// Ruta no encontrada y manejo de errores (siempre al final)
app.use(notFound);
app.use(errorHandler);

export default app;