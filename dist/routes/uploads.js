"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Routes
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const express_validator_1 = require("express-validator");
const helpers_1 = require("../helpers");
const router = (0, express_1.Router)();
router.put('/foto-perfil/:id', [
    middlewares_1.validarJWT,
    (0, middlewares_1.validarRol)('ADMIN', 'USER', 'CHOFER'),
    (0, express_validator_1.check)('id', 'El ID no es valido').isUUID(),
    (0, express_validator_1.check)('id').custom(id => helpers_1.validators.verificarIDExiste(id, 'Usuario')),
    middlewares_1.validarCampos
], controllers_1.uploads.cargarArchivo);
router.get('/foto-perfil/:id', [
    (0, express_validator_1.check)('id', 'El ID no es valido').isUUID(),
    (0, express_validator_1.check)('id').custom(id => helpers_1.validators.verificarIDExiste(id, 'Usuario')),
    middlewares_1.validarCampos
], controllers_1.uploads.verFotoUsuario);
exports.default = router;
