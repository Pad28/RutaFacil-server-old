// Routes
import { Router } from "express";
import { busquedas } from "../controllers";
import { validarCampos, validarJWT, validarRol } from "../middlewares";

const router = Router();

router.get('/:modelo/:termino', [
    validarJWT,
    validarRol('ADMIN', 'USER', 'CHOFER'),
    validarCampos
], busquedas.search);

export default router;