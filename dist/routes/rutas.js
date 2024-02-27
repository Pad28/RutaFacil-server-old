"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const controllers_1 = require("../controllers");
const validar_campos_1 = __importDefault(require("../middlewares/validar-campos"));
const db_validators_1 = __importDefault(require("../helpers/db-validators"));
const middlewares_1 = require("../middlewares");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
router.get('/', [
    middlewares_1.validarJWT,
    (0, middlewares_1.validarRol)(...Object.keys(client_1.Rol_Usuario)),
    validar_campos_1.default
], controllers_1.rutas.listar);
router.get('/:id', [
    middlewares_1.validarJWT,
    (0, middlewares_1.validarRol)(...Object.keys(client_1.Rol_Usuario)),
    (0, express_validator_1.check)('id').custom(id => db_validators_1.default.verificarIDExiste(id, 'Ruta')),
    validar_campos_1.default
], controllers_1.rutas.buscar);
router.post('/', [
    middlewares_1.validarJWT,
    (0, middlewares_1.validarRol)('ADMIN'),
    (0, express_validator_1.check)('destino', 'El destino es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('origen', 'El origen es obligatorio').not().isEmpty(),
    validar_campos_1.default
], controllers_1.rutas.crear);
router.put('/:id', [
    middlewares_1.validarJWT,
    (0, middlewares_1.validarRol)('ADMIN'),
    (0, express_validator_1.check)('id').custom(id => db_validators_1.default.verificarIDExiste(id, 'Ruta')),
    validar_campos_1.default
], controllers_1.rutas.modificar);
router.delete('/:id', [
    middlewares_1.validarJWT,
    (0, middlewares_1.validarRol)('ADMIN'),
    (0, express_validator_1.check)('id').custom(id => db_validators_1.default.verificarIDExiste(id, 'Ruta')),
    validar_campos_1.default
], controllers_1.rutas.delete);
exports.default = router;
