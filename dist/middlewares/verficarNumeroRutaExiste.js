"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const verficarNumeroRutaExiste = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { numero_ruta } = req.body;
    const { prisma } = __1.server;
    try {
        const ruta = yield prisma.ruta.findUnique({ where: { numero: numero_ruta } });
        if (!ruta) {
            return res.status(400).json({
                msg: 'El numero de ruta no es valido'
            });
        }
        req.body.id_ruta = ruta.id;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error de servidor' });
    }
});
exports.default = verficarNumeroRutaExiste;
