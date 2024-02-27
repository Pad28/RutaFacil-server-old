"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
router.post('/users/login', [
    (0, express_validator_1.check)('usuario', 'El usuario es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('password', 'La contraseña es obligatoria').not().isEmpty(),
    middlewares_1.validarCampos
], controllers_1.auth.userLogin);
router.post('/validar-token', [
    middlewares_1.validarJWT,
    (0, middlewares_1.validarRol)('ADMIN', 'USER', 'CHOFER'),
    middlewares_1.validarCampos
], controllers_1.auth.validarToken);
exports.default = router;
