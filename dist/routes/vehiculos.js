"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Vehiculos
const express_1 = require("express");
const vehiculos_1 = __importDefault(require("../controllers/vehiculos"));
const validar_campos_1 = __importDefault(require("../middlewares/validar-campos"));
const express_validator_1 = require("express-validator");
const db_validators_1 = __importDefault(require("../helpers/db-validators"));
const client_1 = require("@prisma/client");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
router.get('/', [
    middlewares_1.validarJWT,
    (0, middlewares_1.validarRol)(...Object.keys(client_1.Rol_Usuario)),
    validar_campos_1.default
], vehiculos_1.default.listar);
router.get('/:id', [
    (0, express_validator_1.check)('id').custom(id => db_validators_1.default.verificarIDExiste(id, 'Vehiculo')),
    validar_campos_1.default
], vehiculos_1.default.buscar);
router.post('/', [
    middlewares_1.validarJWT,
    (0, middlewares_1.validarRol)('ADMIN'),
    (0, express_validator_1.check)('numero_ruta', 'El numero de ruta es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('correo_usuario', 'El correo del chofer es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('correo_usuario').custom(correo => db_validators_1.default.varficarEmailExiste(correo)),
    validar_campos_1.default
], vehiculos_1.default.crear);
router.put('/:id', [
    middlewares_1.validarJWT,
    (0, middlewares_1.validarRol)('ADMIN'),
    (0, express_validator_1.check)('id').custom(id => db_validators_1.default.verificarIDExiste(id, 'Vehiculo')),
    validar_campos_1.default
], vehiculos_1.default.modificar);
router.delete('/:id', [
    middlewares_1.validarJWT,
    (0, middlewares_1.validarRol)('ADMIN'),
    (0, express_validator_1.check)('id').custom(id => db_validators_1.default.verificarIDExiste(id, 'Vehiculo')),
    validar_campos_1.default
], vehiculos_1.default.delete);
exports.default = router;
