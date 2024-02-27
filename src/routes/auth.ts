import { Router } from "express";
import { auth } from "../controllers";
import { validarCampos, validarJWT, validarRol } from "../middlewares";
import { check } from "express-validator";

const router = Router();

router.post('/users/login', [
    check('usuario', 'El usuario es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],auth.userLogin);

router.post('/validar-token', [
    validarJWT,
    validarRol('ADMIN', 'USER', 'CHOFER'),
    validarCampos
], auth.validarToken);

export default router;