import express from 'express';
import cors from 'cors';
import guessRoutes from './routes/guess.routes.js';
import menuRoutes from './routes/menu.routes.js';
import reservaRoutes from './routes/reserva.routes.js';

const app = express();

app.use(cors());
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
