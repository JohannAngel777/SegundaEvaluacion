import { Alert, Badge } from 'reactstrap';


// Formatea un número como dinero: 25 -> "$25.00"
const dinero = (valor) => `$${Number(valor).toFixed(2)}`;

// Panel superior con el saldo y el total de la reserva.
// Props:
// - saldo: saldo disponible (viene de GET /api/reserva)
// - total: total de la reserva actual (viene de GET /api/reserva)
function TopPanel({ saldo = 0, total = 0 }) {
  return (
    <Alert color="info" className="d-flex justify-content-between align-items-center">
      <span>
        Tu saldo actual: <strong>{dinero(saldo)}</strong>
      </span>
      <span>
        Total de tu Reserva:{' '}
        <Badge color="dark" pill>
          {dinero(total)}
        </Badge>
      </span>
    </Alert>
  );
}

export default TopPanel;