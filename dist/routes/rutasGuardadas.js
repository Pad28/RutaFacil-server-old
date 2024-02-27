"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Routes
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const controllers_1 = require("../controllers");
const db_validators_1 = __importDefault(require("../helpers/db-validators"));
const middlewares_1 = require("../middlewares");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
router.get('/', [
    middlewares_1.validarJWT,
    (0, middlewares_1.validarRol)(...Object.keys(client_1.Rol_Usuario)),
    middlewares_1.validarCampos
], controllers_1.rutasGuardadas.listar);
router.get('/:id', [
    middlewares_1.validarJWT,
    (0, middlewares_1.validarRol)(...Object.keys(client_1.Rol_Usuario)),
    (0, express_validator_1.check)('id', 'El ID no es valido').not().isEmpty(),
    (0, express_validator_1.check)('id').custom(id => db_validators_1.default.verificarIDExiste(id, 'RutaGuardada')),
    middlewares_1.validarCampos
], controllers_1.rutasGuardadas.buscar);
router.post('/', [
    middlewares_1.validarJWT,
    (0, middlewares_1.validarRol)(...Object.keys(client_1.Rol_Usuario)),
    (0, express_validator_1.check)('correo_usuario', 'El correo del usuario es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('numero_ruta', 'El numero de ruta es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('numero_ruta').custom(ruta => db_validators_1.default.verificarIDExiste(ruta, 'Ruta')),
    middlewares_1.validarCampos,
    middlewares_1.validarUsuarioEmail,
    middlewares_1.verficarNumeroRutaExiste
], controllers_1.rutasGuardadas.crear);
router.put('/:id', [
    middlewares_1.validarJWT,
    (0, middlewares_1.validarRol)(...Object.keys(client_1.Rol_Usuario)),
    (0, express_validator_1.check)('id', 'El ID no es valido').not().isEmpty(),
    (0, express_validator_1.check)('id').custom(id => db_validators_1.default.verificarIDExiste(id, 'RutaGuardada')),
    middlewares_1.validarCampos
], controllers_1.rutasGuardadas.modificar);
router.delete('/:id', [
    middlewares_1.validarJWT,
    (0, middlewares_1.validarRol)(...Object.keys(client_1.Rol_Usuario)),
    (0, express_validator_1.check)('id', 'El ID no es valido').not().isEmpty(),
    middlewares_1.validarCampos
], controllers_1.rutasGuardadas.delete);
exports.default = router;
