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
const capitalizar_nombre_1 = require("../middlewares/capitalizar-nombre");
const rutas = {
    listar: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { prisma } = __1.server;
        try {
            const [total, rutas] = yield Promise.all([
                prisma.ruta.count({ where: { estado: true } }),
                prisma.ruta.findMany({ where: { estado: true } })
            ]);
            res.status(200).json({ total, rutas });
        }
        catch (error) {
            res.status(500).json({
                msg: 'Error de servidor'
            });
        }
    }),
    buscar: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const { prisma } = __1.server;
        try {
            const ruta = yield prisma.ruta.findUnique({ where: { numero: parseInt(id) } });
            res.status(200).json({ ruta });
        }
        catch (error) {
            res.status(500).json({
                msg: 'Error de servidor'
            });
        }
    }),
    crear: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const _a = req.body, { numero } = _a, body = __rest(_a, ["numero"]);
        const { prisma } = __1.server;
        try {
            body.destino = (0, capitalizar_nombre_1.capitalizar)(body.destino);
            body.origen = (0, capitalizar_nombre_1.capitalizar)(body.origen);
            const ruta = yield prisma.ruta.create({ data: body });
            res.status(200).json({ ruta });
        }
        catch (error) {
            console.log(error);
            if (error instanceof client_1.Prisma.PrismaClientValidationError) {
                return res.status(400).json({
                    msg: 'Atributos no validos'
                });
            }
            res.status(500).json({
                msg: 'Error de servidor'
            });
        }
    }),
    modificar: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        let body = __rest(req.body, []);
        const { prisma } = __1.server;
        try {
            if (body.numero) {
                const validar = yield prisma.ruta.findUnique({ where: { numero: body.numero } });
                if (validar) {
                    return res.status(400).json({ msg: 'Numero de ruta no valido' });
                }
            }
            body.destino = (body.destino) && (0, capitalizar_nombre_1.capitalizar)(body.destino);
            body.origen = (body.origen) && (0, capitalizar_nombre_1.capitalizar)(body.origen);
            const ruta = yield prisma.ruta.update({
                where: { numero: parseInt(id) },
                data: body
            });
            res.status(200).json({ ruta });
        }
        catch (error) {
            console.log(error);
            if (error instanceof client_1.Prisma.PrismaClientValidationError) {
                return res.status(400).json({
                    msg: 'Atributos no validos'
                });
            }
            res.status(500).json({
                msg: 'Error de servidor'
            });
        }
    }),
    delete: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        let _b = req.body, { numero } = _b, body = __rest(_b, ["numero"]);
        const { prisma } = __1.server;
        try {
            // const ruta = await prisma.ruta.update({ 
            //     where: { numero: parseInt(id) },
            //     data: { estado: false }
            // });
            const ruta = yield prisma.ruta.delete({ where: { numero: parseInt(id) } });
            res.status(200).json({ msg: 'Ruta eliminada' });
        }
        catch (error) {
            console.log(error);
            if (error instanceof client_1.Prisma.PrismaClientValidationError) {
                return res.status(400).json({
                    msg: 'Atributos no validos'
                });
            }
            res.status(500).json({
                msg: 'Error de servidor'
            });
        }
    }),
};
exports.default = rutas;
