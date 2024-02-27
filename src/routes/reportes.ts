// Routes
import { Router } from "express";
import { reportes } from "../controllers";
import { validarCampos, validarJWT, validarRol } from "../middlewares";
import { check } from "express-validator";
import { validators } from "../helpers";

const router = Router();

router.get('/', [
    validarJWT,
    validarRol('ADMIN'),
    validarCampos
], reportes.listar);

router.get('/:id', [
    validarJWT,
    validarRol('ADMIN'),
    check('id', 'El ID no es valido').isUUID(),
    check('id').custom( id => validators.verificarIDExiste(id, 'Reporte')),
    validarCampos
], reportes.buscar);

router.post('/', [
    validarJWT,
    check('tipo', 'El tipo es obligatorio').not().isEmpty(),
    check('tipo').custom( cadena => validators.validarEnum(['QUEJA', 'SUGERENCIA'], cadena)),
    check('id_usuario', 'El id de usuario es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    validarCampos
], reportes.crear);

router.put('/:id', [
    validarJWT,
    check('id', 'El ID no es valido').isUUID(),
    check('id').custom( id => validators.verificarIDExiste(id, 'Reporte')),
    validarCampos
], reportes.modificar);

router.delete('/:id', [
    validarJWT,
    validarRol('ADMIN'),
    check('id', 'El ID no es valido').isUUID(),
    check('id').custom( id => validators.verificarIDExiste(id, 'Reporte')),
    validarCampos
], reportes.delete);

export default router;