import { crearMenuInicial } from "../data/menu.js";
import { HttpError } from "../middleware/errorHandler.js";


export const DURACION_RESERVA_SEG = Number(process.env.RESERVA_DURACION_SEG) || 300;
export const SALDO_INICIAL = Number(process.env.SALDO_INICIAL) || 25;

// Estado en memoria del servidor (un solo usuario, según el caso de negocio).
// estado de la reserva: "inactiva" | "activa" | "expirada"
export const state = {
  menu: crearMenuInicial(),
  saldoInicial: SALDO_INICIAL,
  reserva: {
    items: [], // [{ id, cantidad }]
    estado: "inactiva",
    expiraEn: null, // timestamp (ms)
    timer: null,
  },
};


const redondear = (n) => Math.round(n * 100) / 100;

const buscarPlato = (id) => state.menu.find((p) => p.id === id);
const buscarItem = (id) => state.reserva.items.find((i) => i.id === id);

const calcularTotal = () =>
  redondear(
    state.reserva.items.reduce((acc, item) => acc + buscarPlato(item.id).precio * item.cantidad, 0)
  );

const validarEnteroPositivo = (valor, campo) => {
  if (!Number.isInteger(valor) || valor < 1) {
    throw new HttpError(400, `${campo} debe ser un número entero mayor o igual a 1`);
  }
};

// ---------- Temporizador ----------

const devolverStock = () => {
  state.reserva.items.forEach((item) => {
    buscarPlato(item.id).stock += item.cantidad;
  });
};

const expirarReserva = () => {
  devolverStock();
  state.reserva.items = [];
  state.reserva.estado = "expirada";
  state.reserva.expiraEn = null;
  state.reserva.timer = null;
};

const detenerTemporizador = () => {
  if (state.reserva.timer) clearTimeout(state.reserva.timer);
  state.reserva.timer = null;
  state.reserva.expiraEn = null;
};

const iniciarTemporizador = () => {
  detenerTemporizador();
  state.reserva.estado = "activa";
  state.reserva.expiraEn = Date.now() + DURACION_RESERVA_SEG * 1000;
  state.reserva.timer = setTimeout(expirarReserva, DURACION_RESERVA_SEG * 1000);
};

// Respaldo: si por alguna razón el timer no corrió aún, se valida al consultar.
const verificarExpiracion = () => {
  const { estado, expiraEn } = state.reserva;
  if (estado === "activa" && expiraEn && Date.now() >= expiraEn) {
    detenerTemporizador();
    expirarReserva();
  }
};

// Toda operación que modifica la reserva pasa por aquí primero.
const asegurarReservaAbierta = () => {
  verificarExpiracion();
  if (state.reserva.estado === "expirada") {
    throw new HttpError(
      409,
      "Tu reserva expiró por tiempo. Inicia una nueva reserva para continuar."
    );
  }
};

// ---------- Consultas ----------

export const obtenerMenu = () => state.menu;

export const obtenerReserva = () => {
  verificarExpiracion();
  const { items, estado, expiraEn } = state.reserva;
  const total = calcularTotal();
  return {
    saldo: redondear(state.saldoInicial - total),
    itemsReservados: items.map(({ id, cantidad }) => ({ id, cantidad })),
    total,
    estado,
    segundosRestantes: expiraEn ? Math.max(0, Math.ceil((expiraEn - Date.now()) / 1000)) : 0,
    duracionTotalSeg: DURACION_RESERVA_SEG,
  };
};

// ---------- Comandos ----------

export const agregarAlimento = ({ alimentoId, cantidad }) => {
  asegurarReservaAbierta();
  validarEnteroPositivo(alimentoId, "alimentoId");
  validarEnteroPositivo(cantidad, "cantidad");

  const plato = buscarPlato(alimentoId);
  if (!plato) throw new HttpError(404, "El alimento no existe");
  if (plato.stock < cantidad) throw new HttpError(400, "Stock insuficiente");

  const nuevoTotal = redondear(calcularTotal() + plato.precio * cantidad);
  if (nuevoTotal > state.saldoInicial) {
    throw new HttpError(400, "Saldo insuficiente para esta cantidad");
  }

  const existente = buscarItem(alimentoId);
  if (existente) existente.cantidad += cantidad;
  else state.reserva.items.push({ id: alimentoId, cantidad });
  plato.stock -= cantidad;

  // El reloj arranca con el primer plato de la reserva.
  if (state.reserva.estado !== "activa") iniciarTemporizador();
  return obtenerReserva();
};

export const actualizarPorciones = (id, { cantidad }) => {
  asegurarReservaAbierta();
  if (!Number.isInteger(cantidad) || cantidad < 0) {
    throw new HttpError(400, "cantidad debe ser un número entero mayor o igual a 0");
  }

  const item = buscarItem(id);
  if (!item) throw new HttpError(404, "El alimento no está en tu reserva");

  if (cantidad === 0) return eliminarAlimento(id);

  const plato = buscarPlato(id);
  const diferencia = cantidad - item.cantidad;

  if (diferencia > 0) {
    if (plato.stock < diferencia) throw new HttpError(400, "Stock insuficiente");
    const nuevoTotal = redondear(calcularTotal() + plato.precio * diferencia);
    if (nuevoTotal > state.saldoInicial) {
      throw new HttpError(400, "Saldo insuficiente para esta cantidad");
    }
  }

  plato.stock -= diferencia; // si es negativa, devuelve unidades al stock
  item.cantidad = cantidad;
  return obtenerReserva();
};

export const eliminarAlimento = (id) => {
  asegurarReservaAbierta();
  const indice = state.reserva.items.findIndex((i) => i.id === id);
  if (indice === -1) throw new HttpError(404, "El alimento no está en tu reserva");

  const [item] = state.reserva.items.splice(indice, 1);
  buscarPlato(id).stock += item.cantidad;

  if (state.reserva.items.length === 0) {
    detenerTemporizador();
    state.reserva.estado = "inactiva";
  }
  return obtenerReserva();
};

// Extra: confirma la reserva. El stock queda bloqueado y se descuenta el saldo.
export const confirmarReserva = () => {
  asegurarReservaAbierta();
  if (state.reserva.items.length === 0) {
    throw new HttpError(400, "No tienes platos en tu reserva");
  }
  const total = calcularTotal();
  state.saldoInicial = redondear(state.saldoInicial - total);
  state.reserva.items = [];
  state.reserva.estado = "inactiva";
  detenerTemporizador();
  return { mensaje: "Reserva confirmada", totalPagado: total, ...obtenerReserva() };
};

// Extra: inicia una reserva nueva después de que expiró (o descarta la actual).
export const reiniciarReserva = () => {
  verificarExpiracion();
  if (state.reserva.estado === "activa") {
    detenerTemporizador();
    expirarReserva(); // libera el stock de lo que había
  }
  state.reserva.estado = "inactiva";
  return obtenerReserva();
};
