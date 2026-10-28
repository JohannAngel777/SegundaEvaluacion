import { useEffect, useState } from 'react';
import { Alert, Badge, Button } from 'reactstrap';
import { reiniciarReserva } from '../services/api.js';

// Convierte segundos a formato mm:ss
const formatearTiempo = (segundos) => {
  const minutos = String(Math.floor(segundos / 60)).padStart(2, '0');
  const resto = String(segundos % 60).padStart(2, '0');
  return `${minutos}:${resto}`;
};

// Cuenta regresiva de la reserva
// Props:
// - reserva: { estado, segundosRestantes, ... } tal como la devuelve GET /api/reserva
//   estado puede ser "inactiva", "activa" o "expirada"
// - onCambio: función que refresca menú y reserva (la define FoodDei)
// - onError: función que recibe el mensaje de error del backend (la define FoodDei)
function Countdown({ reserva, onCambio, onError }) {
  const [restante, setRestante] = useState(0);

  const estado = reserva?.estado ?? 'inactiva';

  useEffect(() => {
    // Solo hay algo que contar mientras la reserva está activa
    if (estado !== 'activa') return;

    // El backend manda los segundos que faltan; con eso fijamos el momento de vencimiento
    // en el reloj de este navegador (así no importa si los relojes de cliente y servidor difieren)
    const vencimiento = Date.now() + reserva.segundosRestantes * 1000;
    let intervalo;

    const actualizar = () => {
      const segundos = Math.ceil((vencimiento - Date.now()) / 1000);
      if (segundos <= 0) {
        clearInterval(intervalo);
        setRestante(0);
        onCambio(); // el backend ya expiró la reserva: refrescamos para reflejarlo
      } else {
        setRestante(segundos);
      }
    };

    actualizar();
    intervalo = setInterval(actualizar, 1000);

    // Limpieza: evita intervalos duplicados cuando llega una reserva nueva o se desmonta
    return () => clearInterval(intervalo);
  }, [reserva]);

  // POST /api/reserva/reiniciar: deja la reserva en "inactiva" para poder empezar otra
  const reiniciar = async () => {
    try {
      await reiniciarReserva();
    } catch (error) {
      onError(error.message);
    } finally {
      await onCambio();
    }
  };

  if (estado === 'expirada') {
    return (
      <Alert color="danger" className="text-center">
        <p className="mb-2">
          <strong>Reserva cerrada.</strong> Se acabó el tiempo y se liberaron tus platos.
        </p>
        <Button color="primary" size="sm" onClick={reiniciar}>
          Iniciar nueva reserva
        </Button>
      </Alert>
    );
  }

  if (estado === 'inactiva') {
    return (
      <Alert color="light" className="text-center">
        Añade un plato para iniciar el tiempo de tu reserva.
      </Alert>
    );
  }

  return (
    <Alert color="warning" className="text-center">
      Tiempo restante:{' '}
      <Badge color={restante <= 60 ? 'danger' : 'dark'} pill>
        {formatearTiempo(restante)}
      </Badge>
    </Alert>
  );
}

export default Countdown;