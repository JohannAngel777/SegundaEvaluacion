import * as reservaService from "../state/reserva.js";
import { HttpError } from "../middleware/errorHandler.js";

const parseId = (valor) => {
  const id = Number(valor);
  if (!Number.isInteger(id)) throw new HttpError(400, "El id de la URL no es válido");
  return id;
};

export const getReserva = (req, res) => {
  res.status(200).json(reservaService.obtenerReserva());
};

export const agregar = (req, res) => {
  const reserva = reservaService.agregarAlimento(req.body ?? {});
  res.status(201).json(reserva);
};

export const actualizarPorciones = (req, res) => {
  const reserva = reservaService.actualizarPorciones(parseId(req.params.id), req.body ?? {});
  res.status(200).json(reserva);
};

export const eliminar = (req, res) => {
  const reserva = reservaService.eliminarAlimento(parseId(req.params.id));
  res.status(200).json(reserva);
};

export const confirmar = (req, res) => {
  res.status(200).json(reservaService.confirmarReserva());
};

export const reiniciar = (req, res) => {
  res.status(200).json(reservaService.reiniciarReserva());
};
