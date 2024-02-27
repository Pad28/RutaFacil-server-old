"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Routes
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
router.get('/:modelo/:termino', [
    middlewares_1.validarJWT,
    (0, middlewares_1.validarRol)('ADMIN', 'USER', 'CHOFER'),
    middlewares_1.validarCampos
], controllers_1.busquedas.search);
exports.default = router;
