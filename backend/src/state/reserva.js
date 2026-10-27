// Estado de la reserva del usuario, en memoria.
export const SALDO_INICIAL = 25.0;

export const reserva = {
  saldo: SALDO_INICIAL,
  itemsReservados: [], // [{ id: 101, cantidad: 2 }]
  total: 0,
  expiraEn: null // momento (ms) en que se cierra la reserva, null si no hay reserva activa
};

// TODO (Persona 1): funciones auxiliares, por ejemplo:
// - calcularTotal(): recalcula reserva.total a partir de itemsReservados y el menú
// - iniciarTemporizador(): fija reserva.expiraEn con RESERVA_MINUTOS
// - verificarExpiracion(): si ya venció, devuelve el stock al menú y reinicia la reserva
