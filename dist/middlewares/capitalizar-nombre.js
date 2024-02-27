"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.capitalizarNombre = exports.capitalizar = void 0;
const capitalizar = (cadena) => {
    const array = cadena.split(' ');
    array.forEach((str, i) => {
        str = str.toLowerCase();
        if (str.length === 0) {
            return;
        }
        const primerCaracter = str[0].toUpperCase();
        const restocadena = str.slice(1);
        array[i] = primerCaracter + restocadena;
    });
    return array.join(' ');
};
exports.capitalizar = capitalizar;
const capitalizarNombre = (req, res, next) => {
    const { nombre, apellidos } = req.body;
    req.body.nombre = capitalizar(nombre);
    if (apellidos) {
        req.body.apellidos = capitalizar(apellidos);
    }
    next();
};
exports.capitalizarNombre = capitalizarNombre;
