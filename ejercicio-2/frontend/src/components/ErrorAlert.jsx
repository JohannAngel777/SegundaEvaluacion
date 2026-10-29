import { UncontrolledAlert } from 'reactstrap';


// Muestra el mensaje de error del backend en la parte superior.
// Props:
// - error: null o { id, texto }  (el id cambia en cada error nuevo)
function ErrorAlert({ error }) {
  if (!error) return null;

  // key={error.id}: si llega otro error (aunque tenga el mismo texto), React crea
  // la alerta de nuevo. Así reaparece aunque el usuario ya hubiera cerrado la anterior.
  return (
    <UncontrolledAlert color="warning" key={error.id}>
      {error.texto}
    </UncontrolledAlert>
  );
}

export default ErrorAlert;