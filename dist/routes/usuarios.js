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
const capitalizar_nombre_1 = require("../middlewares/capitalizar-nombre");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
router.get('/', [
    middlewares_1.validarJWT,
    (0, middlewares_1.validarRol)('ADMIN'),
    validar_campos_1.default
], controllers_1.usuarios.listar);
router.get('/:id', [
    middlewares_1.validarJWT,
    (0, middlewares_1.validarRol)('ADMIN'),
    (0, express_validator_1.check)('id', 'El ID no es valido').isUUID(),
    (0, express_validator_1.check)('id').custom(id => db_validators_1.default.verificarIDExiste(id, 'Usuario')),
    validar_campos_1.default
], controllers_1.usuarios.buscar);
router.post('/', [
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('correo', 'El correo es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('correo', 'Correo no valido').isEmail(),
    (0, express_validator_1.check)('correo').custom(correo => db_validators_1.default.verificarEmailRepetido(correo)),
    (0, express_validator_1.check)('telefono', 'El telefono es obligatorio').isLength({ min: 10, max: 10 }),
    (0, express_validator_1.check)('telefono').matches(/^[0-9]+$/).withMessage('Telefono no valido'),
    (0, express_validator_1.check)('telefono').custom(telefono => db_validators_1.default.verficarTelefonoRepetido(telefono)),
    (0, express_validator_1.check)('password', 'La contraseña es obligatoria').not().isEmpty(),
    validar_campos_1.default,
    capitalizar_nombre_1.capitalizarNombre
], controllers_1.usuarios.crear);
router.put('/:id', [
    middlewares_1.validarJWT,
    (0, middlewares_1.validarRol)('ADMIN', 'USER', 'CHOFER'),
    (0, express_validator_1.check)('id', 'El id no es valid').isUUID(),
    (0, express_validator_1.check)('id').custom(id => db_validators_1.default.verificarIDExiste(id, 'Usuario')),
    validar_campos_1.default
], controllers_1.usuarios.modificar);
router.delete('/:id', [
    middlewares_1.validarJWT,
    (0, middlewares_1.validarRol)('ADMIN', 'USER', 'CHOFER'),
    (0, express_validator_1.check)('id', 'El id no es valid').isUUID(),
    (0, express_validator_1.check)('id').custom(id => db_validators_1.default.verificarIDExiste(id, 'Usuario')),
    validar_campos_1.default
], controllers_1.usuarios.delete);
exports.default = router;
