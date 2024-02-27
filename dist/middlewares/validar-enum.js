"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarEnum = void 0;
const validarEnum = (cadena, enumeracion, msg) => {
    return (req, res, next) => {
        if (!req.authenticatedUser) {
            return res.status(400).json({ msg: 'Se requiere verificar el token primero' });
        }
        if (!enumeracion.includes(cadena)) {
            return res.status(400).json({ msg });
        }
        next();
    };
};
exports.validarEnum = validarEnum;
