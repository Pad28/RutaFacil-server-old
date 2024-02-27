"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Routes
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const express_validator_1 = require("express-validator");
const helpers_1 = require("../helpers");
const router = (0, express_1.Router)();
router.get('/', [
    middlewares_1.validarJWT,
    (0, middlewares_1.validarRol)('ADMIN'),
    middlewares_1.validarCampos
], controllers_1.reportes.listar);
router.get('/:id', [
    middlewares_1.validarJWT,
    (0, middlewares_1.validarRol)('ADMIN'),
    (0, express_validator_1.check)('id', 'El ID no es valido').isUUID(),
    (0, express_validator_1.check)('id').custom(id => helpers_1.validators.verificarIDExiste(id, 'Reporte')),
    middlewares_1.validarCampos
], controllers_1.reportes.buscar);
router.post('/', [
    middlewares_1.validarJWT,
    (0, express_validator_1.check)('tipo', 'El tipo es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('tipo').custom(cadena => helpers_1.validators.validarEnum(['QUEJA', 'SUGERENCIA'], cadena)),
    (0, express_validator_1.check)('id_usuario', 'El id de usuario es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    middlewares_1.validarCampos
], controllers_1.reportes.crear);
router.put('/:id', [
    middlewares_1.validarJWT,
    (0, express_validator_1.check)('id', 'El ID no es valido').isUUID(),
    (0, express_validator_1.check)('id').custom(id => helpers_1.validators.verificarIDExiste(id, 'Reporte')),
    middlewares_1.validarCampos
], controllers_1.reportes.modificar);
router.delete('/:id', [
    middlewares_1.validarJWT,
    (0, middlewares_1.validarRol)('ADMIN'),
    (0, express_validator_1.check)('id', 'El ID no es valido').isUUID(),
    (0, express_validator_1.check)('id').custom(id => helpers_1.validators.verificarIDExiste(id, 'Reporte')),
    middlewares_1.validarCampos
], controllers_1.reportes.delete);
exports.default = router;
