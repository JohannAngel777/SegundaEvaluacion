import app from './app.js';

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`API de Adivina el Número en http://localhost:${PORT}`);
});
