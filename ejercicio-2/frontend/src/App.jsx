import { Container } from 'reactstrap';
import FoodDei from './pages/FoodDei.jsx';

// Componente raíz del caso de negocio Food DEI
function App() {
  return (
    <Container className="py-3">
      <h1 className="h3 mb-3">Food DEI - Reserva de almuerzos</h1>
      <FoodDei />
    </Container>
  );
}

export default App;
