import { useState } from 'react';
import { Card, CardBody, Form, Input, Button, Alert } from 'reactstrap';
import { enviarIntento } from '../services/api.js';

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

  const manejarEnvio = (e) => {
    e.preventDefault();
    setError('');
    setCargando(true);

    enviarIntento(Number(numero))
      .then((datos) => {
        setMensaje(MENSAJES[datos.resultado]);
        if (datos.resultado === 'correcto') {
          setGano(true);
        }
        setNumero('');
      })
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false));
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
      </CardBody>
    </Card>
  );
}

export default GuessGame;
