// routes
import { Router } from "express";
import horarios from "../controllers/horarios";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar-campos";
import validators from "../helpers/db-validators";
import { validarJWT, validarRol } from "../middlewares";
import { Rol_Usuario } from "@prisma/client";


const router = Router();

router.get('/', [
    validarJWT,
    validarRol(...Object.keys(Rol_Usuario)),
    validarCampos
], horarios.listar);

router.get('/:id' , [
    validarJWT,
    validarRol(...Object.keys(Rol_Usuario)),
    check('id', 'El ID no es valido').isUUID(),
    check('id').custom(id => validators.verificarIDExiste(id, 'Horario')),
    validarCampos
], horarios.buscar)

router.post('/', [
    validarJWT,
    validarRol('ADMIN'),
    check('numero_ruta', 'El numero de ruta es obligatorio').not().isEmpty(),
    check('dia_hora', 'La hora y el dia es obligatoria').not().isEmpty(),
    validarCampos
], horarios.crear);

router.put('/:id', [
    validarJWT,
    validarRol('ADMIN'),
    check('id', 'El ID no es valido').isUUID(),
    check('id').custom(id => validators.verificarIDExiste(id, 'Horario')),
    validarCampos
], horarios.modificar);

router.delete('/:id', [
    validarJWT,
    validarRol('ADMIN'),
    check('id', 'El ID no es valido').isUUID(),
    check('id').custom(id => validators.verificarIDExiste(id, 'Horario')),
    validarCampos
], horarios.delete)

export default router;