// routes
import { Router } from "express";
import { check } from "express-validator";

import { rutas } from "../controllers";
import validarCampos from "../middlewares/validar-campos";
import validators from "../helpers/db-validators";
import { validarJWT, validarRol } from "../middlewares";
import { Rol_Usuario } from "@prisma/client";

const router = Router();

router.get('/', [
    validarJWT,
    validarRol(...Object.keys(Rol_Usuario)),
    validarCampos
], rutas.listar);

router.get('/:id', [
    validarJWT,
    validarRol(...Object.keys(Rol_Usuario)),
    check('id').custom(id => validators.verificarIDExiste(id, 'Ruta')),
    validarCampos
], rutas.buscar);

router.post('/', [
    validarJWT,
    validarRol('ADMIN'),
    check('destino', 'El destino es obligatorio').not().isEmpty(),
    check('origen', 'El origen es obligatorio').not().isEmpty(),
    validarCampos
], rutas.crear);

router.put('/:id', [
    validarJWT,
    validarRol('ADMIN'),
    check('id').custom(id => validators.verificarIDExiste(id, 'Ruta')),
    validarCampos
], rutas.modificar);

router.delete('/:id', [
    validarJWT,
    validarRol('ADMIN'),
    check('id').custom(id => validators.verificarIDExiste(id, 'Ruta')),
    validarCampos
], rutas.delete);

export default router;