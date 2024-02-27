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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const client_1 = require("@prisma/client");
const rutasGuardadas = {
    listar: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { prisma } = __1.server;
        try {
            const [total, rutas_guardadas] = yield Promise.all([
                prisma.rutaGuardada.count(),
                prisma.rutaGuardada.findMany()
            ]);
            res.status(200).json({ total, rutas_guardadas });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ msg: 'Error de servidor' });
        }
    }),
    buscar: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const { prisma } = __1.server;
        try {
            const ruta_gurdada = yield prisma.rutaGuardada.findUnique({ where: { id } });
            res.status(200).json(ruta_gurdada);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ msg: 'Error de servidor' });
        }
    }),
    crear: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let { id, id_usuario, id_ruta } = req.body;
        const { prisma } = __1.server;
        try {
            const rutaGuardada = yield prisma.rutaGuardada.create({
                data: { id_usuario, id_ruta }
            });
            res.status(200).json({ ruta_guardada: rutaGuardada });
        }
        catch (error) {
            console.log(error);
            if (error instanceof client_1.Prisma.PrismaClientValidationError) {
                return res.status(400).json({
                    msg: 'Atributos no validos',
                });
            }
            res.status(500).json({
                msg: 'Error de servidor'
            });
        }
    }),
    modificar: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const _a = req.body, { correo_usuario, numero_ruta } = _a, rest = __rest(_a, ["correo_usuario", "numero_ruta"]);
        const { prisma } = __1.server;
        try {
            if (correo_usuario) {
                const user = yield prisma.usuario.findUnique({ where: { correo: correo_usuario } });
                if (!user) {
                    return res.status(400).json({ msg: 'Usuario no valido' });
                }
                rest.id_usuario = user.id;
            }
            if (numero_ruta) {
                const ruta = yield prisma.ruta.findUnique({ where: { numero: numero_ruta } });
                if (!ruta) {
                    return res.status(400).json({ msg: 'Ruta no valida' });
                }
                rest.id_ruta = ruta.id;
            }
            const ruta_guardada = yield prisma.rutaGuardada.update({
                where: { id },
                data: rest
            });
            res.status(200).json({ ruta_guardada });
        }
        catch (error) {
            console.log(error);
            if (error instanceof client_1.Prisma.PrismaClientValidationError) {
                return res.status(400).json({
                    msg: 'Atributos no validos',
                });
            }
            res.status(500).json({
                msg: 'Error de servidor'
            });
        }
    }),
    delete: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const { prisma } = __1.server;
        try {
            yield prisma.rutaGuardada.delete({
                where: { id_ruta: id }
            });
            res.status(200).json({ msg: 'Ruta Eliminada' });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ msg: 'Error de servidor' });
        }
    }),
};
exports.default = rutasGuardadas;
