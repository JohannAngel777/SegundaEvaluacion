import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, Badge, Button } from 'reactstrap';
// Cuadrícula con el menú del día (Endpoint 1) y botón para añadir (Endpoint 3).
// Props:
// - menu: arreglo [{ id, nombre, precio, stock, categoria }]
// - onAgregar: función (id) que llama a la API; la define FoodDei
// - deshabilitado: true mientras se espera al backend o si la reserva expiró

function MenuGrid({ menu = [], onAgregar, deshabilitado = false }) {
  if (menu.length === 0) {
    return <p className="text-muted">No hay platos disponibles por ahora.</p>;
  }
 
  return (
    <Row>
      {/* .map recorre el arreglo y crea una tarjeta por cada plato */}
      {menu.map((plato) => (
        <Col xs="12" md="4" key={plato.id}>
          <Card className="mb-3">
            <CardBody>
              <CardTitle tag="h5">{plato.nombre}</CardTitle>
              <CardSubtitle className="mb-2 text-muted">{plato.categoria}</CardSubtitle>
              <p className="mb-2">
                <Badge color="success" className="fs-6">
                  ${plato.precio.toFixed(2)}
                </Badge>
              </p>
              <p>Stock disponible: {plato.stock}</p>
 
              {plato.stock === 0 ? (
                <Button color="secondary" disabled block>
                  Agotado
                </Button>
              ) : (
                <Button
                  color="primary"
                  block
                  disabled={deshabilitado}
                  onClick={() => onAgregar(plato.id)}
                >
                  Añadir a la Reserva
                </Button>
              )}
            </CardBody>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
 
export default MenuGrid;