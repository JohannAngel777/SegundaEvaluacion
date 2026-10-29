// Llamadas HTTP al backend del juego
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

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

export const enviarIntento = (numero) =>
  request('/guess', { method: 'POST', body: JSON.stringify({ numero }) });

export const reiniciarJuego = () => request('/reset', { method: 'POST' });
