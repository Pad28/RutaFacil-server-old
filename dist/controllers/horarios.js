"use strict";
// controllers
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
const client_1 = require("@prisma/client");
const __1 = require("..");
const horarios = {
    listar: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { prisma } = __1.server;
        try {
            const [total, hoarios] = yield Promise.all([
                prisma.horario.count(),
                prisma.horario.findMany()
            ]);
            res.status(200).json({ total, hoarios });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                msg: 'Error de servidor'
            });
        }
    }),
    buscar: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const { prisma } = __1.server;
        try {
            const horario = yield prisma.horario.findUnique({ where: { id } });
            res.status(200).json({ horario });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                msg: 'Error de servidor'
            });
        }
    }),
    crear: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id, estado, numero_ruta, dia_hora, } = req.body;
        const { prisma } = __1.server;
        try {
            const rutaID = yield prisma.ruta.findUnique({ where: { numero: numero_ruta }, select: { id: true } });
            if (!rutaID) {
                return res.status(400).json({
                    msg: 'Numero de ruta no valido'
                });
            }
            const horario = yield prisma.horario.create({
                data: {
                    id_ruta: rutaID.id,
                    dia_hora,
                    numero_ruta
                }
            });
            res.status(200).json({ horario });
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
        const _a = req.body, { numero_ruta } = _a, rest = __rest(_a, ["numero_ruta"]);
        const { prisma } = __1.server;
        try {
            if (numero_ruta) {
                const rutaID = yield prisma.ruta.findUnique({ where: { numero: numero_ruta } });
                if (!rutaID) {
                    return res.status(400).json({ msg: 'Numero de ruta no valido' });
                }
                rest.id_ruta = rutaID.id;
                rest.numero_ruta = numero_ruta;
            }
            const horario = yield prisma.horario.update({
                where: { id },
                data: rest
            });
            res.status(200).json({ horario });
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
            yield prisma.horario.delete({ where: { id } });
            res.status(200).json({ msg: 'Horario eliminado' });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                msg: 'Error de servidor'
            });
        }
    }),
};
exports.default = horarios;
