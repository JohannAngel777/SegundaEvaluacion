// Todas las llamadas HTTP al backend pasan por aquí
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Hace la petición y devuelve una promesa con el JSON.
// Si el backend responde con error (4xx/5xx) lanza un Error con su mensaje
const request = async (ruta, opciones = {}) => {
  const respuesta = await fetch(`${API_URL}${ruta}`, {
    headers: { 'Content-Type': 'application/json' },
    ...opciones
  });
  const datos = await respuesta.json().catch(() => ({}));

  if (!respuesta.ok) {
    throw new Error(datos.mensaje || `Error ${respuesta.status}`);
  }
  return datos;
};

// Ejercicio 1: Adivina el Número
export const enviarIntento = (numero) =>
  request('/guess', { method: 'POST', body: JSON.stringify({ numero }) });

export const reiniciarJuego = () => request('/reset', { method: 'POST' });

// Food DEI
export const obtenerMenu = () => request('/api/menu');

export const obtenerReserva = () => request('/api/reserva');

export const agregarAReserva = (alimentoId, cantidad = 1) =>
  request('/api/reserva/agregar', {
    method: 'POST',
    body: JSON.stringify({ alimentoId, cantidad })
  });

export const actualizarPorciones = (id, cantidad) =>
  request(`/api/reserva/actualizar-porciones/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ cantidad })
  });

export const eliminarDeReserva = (id) =>
  request(`/api/reserva/eliminar/${id}`, { method: 'DELETE' });

// Extra (no está en el PDF, pero el backend ya lo tiene): lo usa Countdown.jsx
// para "Iniciar nueva reserva" cuando la reserva expiró
export const reiniciarReserva = () => request('/api/reserva/reiniciar', { method: 'POST' });
