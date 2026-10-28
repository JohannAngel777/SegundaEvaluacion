import { Router } from "express";
import * as ctrl from "../controllers/reserva.controller.js";

const router = Router();

router.get("/", ctrl.getReserva);
router.post("/agregar", ctrl.agregar);
router.put("/actualizar-porciones/:id", ctrl.actualizarPorciones);
router.delete("/eliminar/:id", ctrl.eliminar);

// Extras (no obligatorios): confirmar y reiniciar tras expirar
router.post("/confirmar", ctrl.confirmar);
router.post("/reiniciar", ctrl.reiniciar);

export default router;
