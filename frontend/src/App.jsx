import { useState } from 'react';
import { Container, Nav, NavItem, NavLink } from 'reactstrap';
import GuessGame from './pages/GuessGame.jsx';
import FoodDei from './pages/FoodDei.jsx';

const PAGINAS = [
  { id: 'food', titulo: 'Food DEI' },
  { id: 'guess', titulo: 'Adivina el Número' }
];

function App() {
  const [pagina, setPagina] = useState('food');

  return (
    <Container className="py-4">
      <Nav tabs className="mb-4">
        {PAGINAS.map((p) => (
          <NavItem key={p.id}>
            <NavLink
              href="#"
              active={pagina === p.id}
              onClick={(e) => {
                e.preventDefault();
                setPagina(p.id);
              }}
            >
              {p.titulo}
            </NavLink>
          </NavItem>
        ))}
      </Nav>

      {pagina === 'food' ? <FoodDei /> : <GuessGame />}
    </Container>
  );
}

export default App;
