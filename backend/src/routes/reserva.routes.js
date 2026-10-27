import { Router } from 'express';
import {
  obtenerReserva,
  agregarItem,
  actualizarPorciones,
  eliminarItem
} from '../controllers/reserva.controller.js';

const router = Router();

router.get('/', obtenerReserva);
router.post('/agregar', agregarItem);
router.put('/actualizar-porciones/:id', actualizarPorciones);
router.delete('/eliminar/:id', eliminarItem);

export default router;
