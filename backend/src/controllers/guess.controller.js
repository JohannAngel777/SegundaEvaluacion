// Ejercicio 1: Adivina el Número

// Genera un número entero aleatorio entre 1 y 100
const generarNumero = () => Math.floor(Math.random() * 100) + 1;

// Número oculto, se genera al iniciar el servidor
let numeroSecreto = generarNumero();

// POST /guess  body: { numero }
// Responde si el número oculto es mayor, menor o si el intento es correcto
export const adivinar = (req, res) => {
  const numero = Number(req.body.numero);

  if (!Number.isInteger(numero) || numero < 1 || numero > 100) {
    return res.status(400).json({ mensaje: 'Debes enviar un número entero entre 1 y 100' });
  }

  let resultado;
  if (numeroSecreto > numero) {
    resultado = 'mayor';
  } else if (numeroSecreto < numero) {
    resultado = 'menor';
  } else {
    resultado = 'correcto';
  }

  res.json({ resultado });
};

// POST /reset
// Genera un nuevo número oculto para empezar otra partida
export const reiniciar = (req, res) => {
  numeroSecreto = generarNumero();
  res.json({ mensaje: 'Nuevo número generado, ¡a jugar!' });
};
