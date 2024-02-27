"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paradas_1 = __importDefault(require("../controllers/paradas"));
const validar_campos_1 = __importDefault(require("../middlewares/validar-campos"));
const express_validator_1 = require("express-validator");
const db_validators_1 = __importDefault(require("../helpers/db-validators"));
const middlewares_1 = require("../middlewares");
const client_1 = require("@prisma/client");
// routes
const router = (0, express_1.Router)();
router.get('/', [
    middlewares_1.validarJWT,
    (0, middlewares_1.validarRol)(...Object.keys(client_1.Rol_Usuario)),
    validar_campos_1.default
], paradas_1.default.listar);
router.get('/:id', [
    middlewares_1.validarJWT,
    (0, middlewares_1.validarRol)(...Object.keys(client_1.Rol_Usuario)),
    (0, express_validator_1.check)('id', 'El ID no es valido').isUUID(),
    (0, express_validator_1.check)('id').custom(id => db_validators_1.default.verificarIDExiste(id, 'Parada')),
    validar_campos_1.default
], paradas_1.default.buscar);
router.post('/', [
    middlewares_1.validarJWT,
    (0, middlewares_1.validarRol)('ADMIN'),
    (0, express_validator_1.check)('numero_ruta', 'El numero de ruta es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('nombre_calle', 'El nombre de calle es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('longitud', 'La longitud es obligatoria').not().isEmpty(),
    (0, express_validator_1.check)('latitud', 'La latitud es obligatoria').not().isEmpty(),
    validar_campos_1.default
], paradas_1.default.crear);
router.put('/:id', [
    middlewares_1.validarJWT,
    (0, middlewares_1.validarRol)('ADMIN'),
    (0, express_validator_1.check)('id', 'El ID no es valido').isUUID(),
    (0, express_validator_1.check)('id').custom(id => db_validators_1.default.verificarIDExiste(id, 'Parada')),
    validar_campos_1.default
], paradas_1.default.modificar);
router.delete('/:id', [
    middlewares_1.validarJWT,
    (0, middlewares_1.validarRol)('ADMIN'),
    (0, express_validator_1.check)('id', 'El ID no es valido').isUUID(),
    (0, express_validator_1.check)('id').custom(id => db_validators_1.default.verificarIDExiste(id, 'Parada')),
    validar_campos_1.default
], paradas_1.default.delete);
exports.default = router;
