import { useState } from 'react';
import { Container, Nav, NavItem, NavLink } from 'reactstrap';
import FoodDei from './pages/FoodDei.jsx';
import GuessGame from './pages/GuessGame.jsx';
 
// Componente raíz: dos pestañas, una por cada problema de la evaluación
function App() {
  const [pagina, setPagina] = useState('fooddei');
 
  return (
    <Container className="py-3">
      <h1 className="h3 mb-3">Evaluación II - Programación Web</h1>
 
      <Nav tabs className="mb-3">
        <NavItem>
          <NavLink href="#" active={pagina === 'fooddei'} onClick={() => setPagina('fooddei')}>
            Food DEI
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#" active={pagina === 'guess'} onClick={() => setPagina('guess')}>
            Adivina el Número
          </NavLink>
        </NavItem>
      </Nav>
 
      {pagina === 'fooddei' ? <FoodDei /> : <GuessGame />}
    </Container>
  );
}
 
export default App;