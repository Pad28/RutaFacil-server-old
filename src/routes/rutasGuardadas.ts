// Routes
import { Router } from "express";
import { check } from "express-validator";

import { rutasGuardadas } from "../controllers";
import validators from "../helpers/db-validators";
import { validarCampos, validarJWT, validarRol, validarUsuarioEmail, verficarNumeroRutaExiste } from "../middlewares";
import { Rol_Usuario } from "@prisma/client";

const router = Router()
router.get('/', [
    validarJWT,
    validarRol(...Object.keys(Rol_Usuario)),
    validarCampos
], rutasGuardadas.listar);

router.get('/:id', [
    validarJWT,
    validarRol(...Object.keys(Rol_Usuario)),
    check('id', 'El ID no es valido').not().isEmpty(),
    check('id').custom(id => validators.verificarIDExiste(id, 'RutaGuardada')),
    validarCampos
],rutasGuardadas.buscar);

router.post('/', [
    validarJWT,
    validarRol(...Object.keys(Rol_Usuario)),
    check('correo_usuario', 'El correo del usuario es obligatorio').not().isEmpty(),
    check('numero_ruta', 'El numero de ruta es obligatorio').not().isEmpty(),
    check('numero_ruta').custom(ruta => validators.verificarIDExiste(ruta, 'Ruta')),
    validarCampos,
    validarUsuarioEmail,
    verficarNumeroRutaExiste
], rutasGuardadas.crear);

router.put('/:id', [
    validarJWT,
    validarRol(...Object.keys(Rol_Usuario)),
    check('id', 'El ID no es valido').not().isEmpty(),
    check('id').custom(id => validators.verificarIDExiste(id, 'RutaGuardada')),
    validarCampos
], rutasGuardadas.modificar);

router.delete('/:id', [
    validarJWT,
    validarRol(...Object.keys(Rol_Usuario)),
    check('id', 'El ID no es valido').not().isEmpty(),
    validarCampos
], rutasGuardadas.delete);

export default router;