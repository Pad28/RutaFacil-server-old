// Routes
import { Router } from "express";
import { notificaiones } from "../controllers/notificaiones";
import { validarCampos, validarJWT, validarRol } from "../middlewares";
import { Rol_Usuario } from "@prisma/client";
import { check } from "express-validator";
import { validators } from "../helpers";

const router = Router();

router.get('/recordatorio', [
    validarJWT,
    validarRol(...Object.keys(Rol_Usuario)),
    validarCampos
], notificaiones.listar);

router.post('/recordatorio', [
    validarJWT,
    validarRol(...Object.keys(Rol_Usuario)),
    check('id_usuario', 'El ID del usuario es obligatorio').not().isEmpty(),
    check('id_ruta', 'El ID de ruta es obligatorio').not().isEmpty(),
    check('id_usuario', 'El ID de usuario no es valido').isUUID(),
    check('id_usuario').custom(id => validators.verificarIDExiste(id, 'Usuario')),
    check('hora', 'La hora es obligatoria').not().isEmpty(),
    check('minuto', 'El minuto es obligatorio').not().isEmpty(),
    check('horario', 'El horario es obligatorio').not().isEmpty(),
    check('horario').custom(h => validators.validarEnum(['AM', 'PM'], h)),
    validarCampos
], notificaiones.crear);
router.delete('/recordatorio/:id', [
    validarJWT,
    validarRol(...Object.keys(Rol_Usuario)),
    validarCampos
],notificaiones.delete);

export default router;