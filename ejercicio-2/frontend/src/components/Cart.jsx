import { useState } from 'react';
import { ListGroup, ListGroupItem, ButtonGroup, Button, Badge } from 'reactstrap';
import { actualizarPorciones, eliminarDeReserva } from '../services/api.js';

// Bandeja de reserva (carrito lateral)
// Props:
// - reserva: { saldo, itemsReservados: [{ id, cantidad }], total }
// - menu: arreglo de platos, se usa para mostrar nombre y precio de cada item
// - onCambio: función que refresca menú y reserva (la define FoodDei)
// - onError: función que recibe el mensaje de error del backend (la define FoodDei)
function Cart({ reserva, menu = [], onCambio, onError }) {
  // id del plato que se está procesando, para bloquear sus botones mientras responde el backend
  const [procesandoId, setProcesandoId] = useState(null);

  const items = reserva?.itemsReservados ?? [];

  // Ejecuta una acción de la API, captura el error del backend y refresca los datos
  const ejecutar = async (id, accion) => {
    setProcesandoId(id);
    try {
      await accion();
    } catch (error) {
      onError(error.message);
    } finally {
      await onCambio();
      setProcesandoId(null);
    }
  };

  // Botones - y +: PUT /api/reserva/actualizar-porciones/:id
  const cambiarPorciones = (id, nuevaCantidad) =>
    ejecutar(id, () => actualizarPorciones(id, nuevaCantidad));

  // Botón Quitar: DELETE /api/reserva/eliminar/:id
  const quitar = (id) => ejecutar(id, () => eliminarDeReserva(id));

  return (
    <div>
      <h5 className="mb-3">Tu bandeja de reserva</h5>

      <ListGroup>
        {items.length === 0 && (
          <ListGroupItem className="text-muted">Tu bandeja está vacía</ListGroupItem>
        )}

        {items.map((item) => {
          const plato = menu.find((p) => p.id === item.id);
          const ocupado = procesandoId === item.id;

          return (
            <ListGroupItem key={item.id}>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>{plato ? plato.nombre : `Plato #${item.id}`}</strong>
                  {plato && (
                    <div className="text-muted small">
                      ${plato.precio.toFixed(2)} c/u · Subtotal: ${(plato.precio * item.cantidad).toFixed(2)}
                    </div>
                  )}
                </div>
                <Badge color="secondary" pill>
                  x{item.cantidad}
                </Badge>
              </div>

              <div className="d-flex justify-content-between align-items-center mt-2">
                <ButtonGroup size="sm">
                  <Button
                    outline
                    color="secondary"
                    disabled={ocupado || item.cantidad <= 1}
                    onClick={() => cambiarPorciones(item.id, item.cantidad - 1)}
                  >
                    -
                  </Button>
                  <Button
                    outline
                    color="secondary"
                    disabled={ocupado}
                    onClick={() => cambiarPorciones(item.id, item.cantidad + 1)}
                  >
                    +
                  </Button>
                </ButtonGroup>

                <Button color="danger" outline size="sm" disabled={ocupado} onClick={() => quitar(item.id)}>
                  Quitar
                </Button>
              </div>
            </ListGroupItem>
          );
        })}
      </ListGroup>
    </div>
  );
}

export default Cart;