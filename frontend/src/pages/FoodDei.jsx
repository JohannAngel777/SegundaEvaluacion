import { Row, Col } from 'reactstrap';
import TopPanel from '../components/TopPanel.jsx';
import MenuGrid from '../components/MenuGrid.jsx';
import Cart from '../components/Cart.jsx';
import Countdown from '../components/Countdown.jsx';
import ErrorAlert from '../components/ErrorAlert.jsx';

// TODO (Persona 2): estado de la pantalla y carga de datos
// - useState: menu, reserva, error, cargando
// - useEffect: al montar, obtenerMenu() y obtenerReserva()
// - funciones que llaman a la API y refrescan menú y reserva, pasarlas como props

function FoodDei() {
  return (
    <>
      <TopPanel />
      <ErrorAlert />
      <Row>
        <Col md="8">
          <MenuGrid />
        </Col>
        <Col md="4">
          <Countdown />
          <Cart />
        </Col>
      </Row>
    </>
  );
}

export default FoodDei;
