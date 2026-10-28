import { useState } from 'react';
import { Card, CardBody, Form, Input, Button, Alert, ListGroup, ListGroupItem, Badge } from 'reactstrap';
import { enviarIntento, reiniciarJuego } from '../services/api.js';

// Textos que se muestran según lo que responde el servidor
const MENSAJES = {
  mayor: 'El número secreto es MAYOR',
  menor: 'El número secreto es MENOR',
  correcto: '¡Correcto! Adivinaste el número'
};

function GuessGame() {
  const [numero, setNumero] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [gano, setGano] = useState(false);
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  // Historial de la partida: [{ numero: 50, resultado: 'menor' }]
  const [intentos, setIntentos] = useState([]);

  // Los intentos fallidos son todos los que no fueron correctos
  const intentosFallidos = intentos.filter((intento) => intento.resultado !== 'correcto');

  const manejarEnvio = (e) => {
    e.preventDefault();
    setError('');
    setCargando(true);

    const valor = Number(numero);

    enviarIntento(valor)
      .then((datos) => {
        setMensaje(MENSAJES[datos.resultado]);
        setIntentos([...intentos, { numero: valor, resultado: datos.resultado }]);
        if (datos.resultado === 'correcto') {
          setGano(true);
        }
        setNumero('');
      })
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false));
  };

  const manejarReinicio = () => {
    reiniciarJuego()
      .then(() => {
        setNumero('');
        setMensaje('');
        setGano(false);
        setError('');
        setIntentos([]);
      })
      .catch((err) => setError(err.message));
  };

  return (
    <Card>
      <CardBody>
        <h2>Adivina el Número</h2>
        <p className="text-muted">Estoy pensando en un número entre 1 y 100.</p>

        <Form onSubmit={manejarEnvio} className="d-flex gap-2 mb-3">
          <Input
            type="number"
            min="1"
            max="100"
            placeholder="Tu número"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            disabled={gano}
            required
          />
          <Button color="primary" disabled={gano || cargando}>
            {cargando ? 'Enviando...' : 'Intentar'}
          </Button>
        </Form>

        {error && <Alert color="warning">{error}</Alert>}
        {mensaje && <Alert color={gano ? 'success' : 'info'}>{mensaje}</Alert>}

        {intentos.length > 0 && (
          <>
            <h5>
              Historial <Badge color="secondary" pill>{intentosFallidos.length} fallidos</Badge>
            </h5>
            <ListGroup className="mb-3">
              {intentos.map((intento, index) => (
                <ListGroupItem
                  key={index}
                  color={intento.resultado === 'correcto' ? 'success' : ''}
                  className="d-flex justify-content-between"
                >
                  <span>Intento {index + 1}: {intento.numero}</span>
                  <span>{intento.resultado}</span>
                </ListGroupItem>
              ))}
            </ListGroup>
          </>
        )}

        <Button color="secondary" outline onClick={manejarReinicio}>
          Reiniciar juego
        </Button>
      </CardBody>
    </Card>
  );
}

export default GuessGame;
