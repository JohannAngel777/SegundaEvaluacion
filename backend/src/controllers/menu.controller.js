import * as reservaService from "../state/reserva.js";

export const getMenu = (req, res) => {
  res.status(200).json(reservaService.obtenerMenu());
};
