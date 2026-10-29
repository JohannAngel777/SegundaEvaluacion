// Error con código HTTP para lanzar desde los servicios.
export class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export const notFound = (req, res) => {
  res.status(404).json({ mensaje: `Ruta no encontrada: ${req.method} ${req.originalUrl}` });
};

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    return res.status(err.status).json({ mensaje: err.message });
  }
  if (err instanceof SyntaxError && err.status === 400) {
    return res.status(400).json({ mensaje: "JSON inválido en el cuerpo de la petición" });
  }
  console.error(err);
  res.status(500).json({ mensaje: "Error interno del servidor" });
};
