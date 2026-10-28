import express from 'express';
import cors from 'cors';
import guessRoutes from './routes/guess.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

// Rutas del juego: POST /guess y POST /reset
app.use('/', guessRoutes);

// Ruta no encontrada
app.use((req, res) => {
  res.status(404).json({ mensaje: 'Ruta no encontrada' });
});

// Manejo de errores inesperados
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ mensaje: 'Error interno del servidor' });
});

export default app;
