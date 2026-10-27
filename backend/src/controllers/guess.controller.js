// Ejercicio 1: Adivina el Número
// TODO (Persona 4): implementar en la rama feature/ejercicio1

// POST /guess  body: { numero }
// Responde { resultado: 'mayor' | 'menor' | 'correcto' }
export const adivinar = (req, res) => {
  res.status(501).json({ mensaje: 'POST /guess pendiente de implementar' });
};

// POST /reset
// Genera un nuevo número aleatorio entre 1 y 100
export const reiniciar = (req, res) => {
  res.status(501).json({ mensaje: 'POST /reset pendiente de implementar' });
};
