import { useState, useEffect } from 'react';
import { Row, Col, Spinner} from 'reactstrap';
import TopPanel from '../components/TopPanel.jsx';
import MenuGrid from '../components/MenuGrid.jsx';
import Cart from '../components/Cart.jsx';
import Countdown from '../components/Countdown.jsx';
import ErrorAlert from '../components/ErrorAlert.jsx';
import { obtenerMenu, obtenerReserva, agregarAReserva } from '../services/api.js';


const RESERVA_INICIAL = {
  saldo: 0,
  itemsReservados: [],
  total: 0,
  estado: 'inactiva',
  segundosRestantes: 0
};
 
function FoodDei() {
  // ---------- Estado de la pantalla ----------
  const [menu, setMenu] = useState([]); // arreglo de platos
  const [reserva, setReserva] = useState(RESERVA_INICIAL); // objeto con saldo, items, total, estado
  const [error, setError] = useState(null); // null o { id, texto }
  const [cargando, setCargando] = useState(true); // true mientras se espera al backend
 
  // Guarda el error con un id nuevo para que ErrorAlert lo muestre otra vez
  // Cart y Countdown reciben esta función como onError y le pasan error.message
  const mostrarError = (texto) => setError({ id: Date.now(), texto });
 
  // Pide menú y reserva al backend al mismo tiempo y actualiza el estado.
  // Cart y Countdown la usan como onCambio después de cada acción.
  const cargarDatos = async () => {
    setCargando(true);
    try {
      // Promise.all espera las dos promesas en paralelo
      const [menuActual, reservaActual] = await Promise.all([obtenerMenu(), obtenerReserva()]);
      setMenu(menuActual);
      setReserva(reservaActual);
    } catch (err) {
      mostrarError(err.message);
    } finally {
      // finally se ejecuta siempre: con éxito o con error se apaga el "Cargando..."
      setCargando(false);
    }
  };
 
  // Al montar la página (arreglo de dependencias vacío) se cargan los datos una vez
  useEffect(() => {
    cargarDatos();
  }, []);
 
  // Botón "Añadir a la Reserva" -> POST /api/reserva/agregar
  const handleAgregar = async (alimentoId) => {
    setError(null);
    setCargando(true);
    try {
      await agregarAReserva(alimentoId, 1);
    } catch (err) {
      // "Stock insuficiente", "Saldo insuficiente para esta cantidad", reserva expirada...
      mostrarError(err.message);
    } finally {
      // Se refresca siempre: el backend es la fuente de verdad del stock y del saldo
      await cargarDatos();
    }
  };
 
  return (
    <>
      <ErrorAlert error={error} />
      <TopPanel saldo={reserva.saldo} total={reserva.total} />
 
      {cargando && (
        <div className="text-muted">
          <Spinner size="sm" color="primary" /> Cargando...
        </div>
      )}
 
      <Row>
        <Col md="8">
          <MenuGrid
            menu={menu}
            onAgregar={handleAgregar}
            deshabilitado={cargando || reserva.estado === 'expirada'}
          />
        </Col>
        <Col md="4">
          <Countdown reserva={reserva} onCambio={cargarDatos} onError={mostrarError} />
          <Cart reserva={reserva} menu={menu} onCambio={cargarDatos} onError={mostrarError} />
        </Col>
      </Row>
    </>
  );
}
 
export default FoodDei;
