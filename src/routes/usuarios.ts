// routes
import { Router } from "express";
import { check } from "express-validator";

import { usuarios } from "../controllers";
import validarCampos from "../middlewares/validar-campos";
import validators from "../helpers/db-validators";
import { capitalizarNombre } from "../middlewares/capitalizar-nombre";
import { validarJWT, validarRol } from "../middlewares";

const router = Router();

router.get('/', [
    validarJWT,
    validarRol('ADMIN'),
    validarCampos
], usuarios.listar);

router.get('/:id', [
    validarJWT,
    validarRol('ADMIN'),
    check('id', 'El ID no es valido').isUUID(),
    check('id').custom(id => validators.verificarIDExiste(id, 'Usuario')),
    validarCampos
], usuarios.buscar);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo es obligatorio').not().isEmpty(),
    check('correo', 'Correo no valido').isEmail(),
    check('correo').custom(correo => validators.verificarEmailRepetido(correo)),
    check('telefono', 'El telefono es obligatorio').isLength({ min: 10, max: 10 }),
    check('telefono').matches(/^[0-9]+$/).withMessage('Telefono no valido'),
    check('telefono').custom(telefono => validators.verficarTelefonoRepetido(telefono)),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos,
    capitalizarNombre
],usuarios.crear);

router.put('/:id', [
    validarJWT,
    validarRol('ADMIN', 'USER', 'CHOFER'),
    check('id', 'El id no es valid').isUUID(),
    check('id').custom(id => validators.verificarIDExiste(id, 'Usuario')),
    validarCampos
], usuarios.modificar);

router.delete('/:id', [
    validarJWT,
    validarRol('ADMIN', 'USER', 'CHOFER'),
    check('id', 'El id no es valid').isUUID(),
    check('id').custom(id => validators.verificarIDExiste(id, 'Usuario')),
    validarCampos
], usuarios.delete);

export default router;