import { Router } from "express";
import paradas from "../controllers/paradas";
import validarCampos from "../middlewares/validar-campos";
import { check } from "express-validator";
import validators from "../helpers/db-validators";
import { validarJWT, validarRol } from "../middlewares";
import { Rol_Usuario } from "@prisma/client";

// routes
const router = Router()

router.get('/', [
    validarJWT,
    validarRol(...Object.keys(Rol_Usuario)),
    validarCampos
], paradas.listar);

router.get('/:id', [
    validarJWT,
    validarRol(...Object.keys(Rol_Usuario)),
    check('id', 'El ID no es valido').isUUID(),
    check('id').custom(id => validators.verificarIDExiste(id, 'Parada')),
    validarCampos
], paradas.buscar);

router.post('/', [
    validarJWT,
    validarRol('ADMIN'),
    check('numero_ruta', 'El numero de ruta es obligatorio').not().isEmpty(),
    check('nombre_calle', 'El nombre de calle es obligatorio').not().isEmpty(),
    check('longitud', 'La longitud es obligatoria').not().isEmpty(),
    check('latitud', 'La latitud es obligatoria').not().isEmpty(),
    validarCampos
], paradas.crear);

router.put('/:id', [
    validarJWT,
    validarRol('ADMIN'),
    check('id', 'El ID no es valido').isUUID(),
    check('id').custom(id => validators.verificarIDExiste(id, 'Parada')),
    validarCampos
], paradas.modificar);

router.delete('/:id', [
    validarJWT,
    validarRol('ADMIN'),
    check('id', 'El ID no es valido').isUUID(),
    check('id').custom(id => validators.verificarIDExiste(id, 'Parada')),
    validarCampos
], paradas.delete);

export default router;