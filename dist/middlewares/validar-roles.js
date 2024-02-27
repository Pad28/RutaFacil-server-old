"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarRol = void 0;
const validarRol = (...roles) => {
    return (req, res, next) => {
        if (!req.authenticatedUser) {
            return res.status(400).json({ msg: 'Se requiere verificar el token primero' });
        }
        if (!roles.includes(req.authenticatedUser.rol)) {
            return res.status(400).json({ msg: 'Se requiere uno de los siquietes roles: ' + roles });
        }
        next();
    };
};
exports.validarRol = validarRol;
