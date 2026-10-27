// TODO (Persona 1): implementar en la rama feature/backend-food-dei
// Todos los errores se responden como { mensaje: '...' }

// GET /api/reserva
// Devuelve { saldo, itemsReservados: [{ id, cantidad }], total }
export const obtenerReserva = (req, res) => {
  res.status(501).json({ mensaje: 'GET /api/reserva pendiente de implementar' });
};

// POST /api/reserva/agregar  body: { alimentoId, cantidad }
// 400 'Stock insuficiente' si stock < cantidad
export const agregarItem = (req, res) => {
  res.status(501).json({ mensaje: 'POST /api/reserva/agregar pendiente de implementar' });
};

// PUT /api/reserva/actualizar-porciones/:id  body: { cantidad }
// 400 'Saldo insuficiente para esta cantidad' si el total supera el saldo
export const actualizarPorciones = (req, res) => {
  res.status(501).json({ mensaje: 'PUT /api/reserva/actualizar-porciones/:id pendiente de implementar' });
};

// DELETE /api/reserva/eliminar/:id
// Quita el platillo de la reserva y devuelve las unidades al stock
export const eliminarItem = (req, res) => {
  res.status(501).json({ mensaje: 'DELETE /api/reserva/eliminar/:id pendiente de implementar' });
};
