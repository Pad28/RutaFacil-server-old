// Routes
import { Router } from "express";
import { uploads } from "../controllers";
import { validarCampos, validarJWT, validarRol } from "../middlewares";
import { check } from "express-validator";
import { validators } from "../helpers";

const router = Router();

router.put('/foto-perfil/:id', [
    validarJWT,
    validarRol('ADMIN', 'USER', 'CHOFER'),
    check('id', 'El ID no es valido').isUUID(),
    check('id').custom(id => validators.verificarIDExiste(id, 'Usuario')),
    validarCampos
], uploads.cargarArchivo);


router.get('/foto-perfil/:id', [
    check('id', 'El ID no es valido').isUUID(),
    check('id').custom(id => validators.verificarIDExiste(id, 'Usuario')),
    validarCampos
], uploads.verFotoUsuario)
export default router;