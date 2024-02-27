//Vehiculos
import { Router } from "express";
import vehiculos from "../controllers/vehiculos";
import validarCampos from "../middlewares/validar-campos";
import { check } from "express-validator";
import validators from "../helpers/db-validators";
import { Rol_Usuario } from "@prisma/client";
import { validarJWT, validarRol } from "../middlewares";

const router = Router();

router.get('/', [
    validarJWT,
    validarRol(...Object.keys(Rol_Usuario)),
    validarCampos
], vehiculos.listar);

router.get('/:id', [
    check('id').custom(id => validators.verificarIDExiste(id, 'Vehiculo')),
    validarCampos
], vehiculos.buscar);

router.post('/', [
    validarJWT,
    validarRol('ADMIN'),
    check('numero_ruta', 'El numero de ruta es obligatorio').not().isEmpty(),
    check('correo_usuario', 'El correo del chofer es obligatorio').not().isEmpty(),
    check('correo_usuario').custom(correo => validators.varficarEmailExiste(correo)),
    validarCampos
], vehiculos.crear);

router.put('/:id', [
    validarJWT,
    validarRol('ADMIN'),
    check('id').custom(id => validators.verificarIDExiste(id, 'Vehiculo')),
    validarCampos
], vehiculos.modificar);

router.delete('/:id', [
    validarJWT,
    validarRol('ADMIN'),
    check('id').custom(id => validators.verificarIDExiste(id, 'Vehiculo')),
    validarCampos
], vehiculos.delete);

export default router;