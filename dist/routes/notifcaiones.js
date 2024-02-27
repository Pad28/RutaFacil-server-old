"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Routes
const express_1 = require("express");
const notificaiones_1 = require("../controllers/notificaiones");
const middlewares_1 = require("../middlewares");
const client_1 = require("@prisma/client");
const express_validator_1 = require("express-validator");
const helpers_1 = require("../helpers");
const router = (0, express_1.Router)();
router.get('/recordatorio', [
    middlewares_1.validarJWT,
    (0, middlewares_1.validarRol)(...Object.keys(client_1.Rol_Usuario)),
    middlewares_1.validarCampos
], notificaiones_1.notificaiones.listar);
router.post('/recordatorio', [
    middlewares_1.validarJWT,
    (0, middlewares_1.validarRol)(...Object.keys(client_1.Rol_Usuario)),
    (0, express_validator_1.check)('id_usuario', 'El ID del usuario es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('id_ruta', 'El ID de ruta es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('id_usuario', 'El ID de usuario no es valido').isUUID(),
    (0, express_validator_1.check)('id_usuario').custom(id => helpers_1.validators.verificarIDExiste(id, 'Usuario')),
    (0, express_validator_1.check)('hora', 'La hora es obligatoria').not().isEmpty(),
    (0, express_validator_1.check)('minuto', 'El minuto es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('horario', 'El horario es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('horario').custom(h => helpers_1.validators.validarEnum(['AM', 'PM'], h)),
    middlewares_1.validarCampos
], notificaiones_1.notificaiones.crear);
router.delete('/recordatorio/:id', [
    middlewares_1.validarJWT,
    (0, middlewares_1.validarRol)(...Object.keys(client_1.Rol_Usuario)),
    middlewares_1.validarCampos
], notificaiones_1.notificaiones.delete);
exports.default = router;
