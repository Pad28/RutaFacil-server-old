"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes
const express_1 = require("express");
const horarios_1 = __importDefault(require("../controllers/horarios"));
const express_validator_1 = require("express-validator");
const validar_campos_1 = __importDefault(require("../middlewares/validar-campos"));
const db_validators_1 = __importDefault(require("../helpers/db-validators"));
const middlewares_1 = require("../middlewares");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
router.get('/', [
    middlewares_1.validarJWT,
    (0, middlewares_1.validarRol)(...Object.keys(client_1.Rol_Usuario)),
    validar_campos_1.default
], horarios_1.default.listar);
router.get('/:id', [
    middlewares_1.validarJWT,
    (0, middlewares_1.validarRol)(...Object.keys(client_1.Rol_Usuario)),
    (0, express_validator_1.check)('id', 'El ID no es valido').isUUID(),
    (0, express_validator_1.check)('id').custom(id => db_validators_1.default.verificarIDExiste(id, 'Horario')),
    validar_campos_1.default
], horarios_1.default.buscar);
router.post('/', [
    middlewares_1.validarJWT,
    (0, middlewares_1.validarRol)('ADMIN'),
    (0, express_validator_1.check)('numero_ruta', 'El numero de ruta es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('dia_hora', 'La hora y el dia es obligatoria').not().isEmpty(),
    validar_campos_1.default
], horarios_1.default.crear);
router.put('/:id', [
    middlewares_1.validarJWT,
    (0, middlewares_1.validarRol)('ADMIN'),
    (0, express_validator_1.check)('id', 'El ID no es valido').isUUID(),
    (0, express_validator_1.check)('id').custom(id => db_validators_1.default.verificarIDExiste(id, 'Horario')),
    validar_campos_1.default
], horarios_1.default.modificar);
router.delete('/:id', [
    middlewares_1.validarJWT,
    (0, middlewares_1.validarRol)('ADMIN'),
    (0, express_validator_1.check)('id', 'El ID no es valido').isUUID(),
    (0, express_validator_1.check)('id').custom(id => db_validators_1.default.verificarIDExiste(id, 'Horario')),
    validar_campos_1.default
], horarios_1.default.delete);
exports.default = router;
