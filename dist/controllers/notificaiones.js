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
exports.notificaiones = void 0;
const __1 = require("..");
const client_1 = require("@prisma/client");
exports.notificaiones = {
    listar: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { notificacion } = __1.server.prisma;
        try {
            const [total, notificaiones] = yield Promise.all([
                notificacion.count(),
                notificacion.findMany()
            ]);
            res.status(200).json({ total, notificaiones });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                msg: 'Error de servidor'
            });
        }
    }),
    crear: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const _a = req.body, { id } = _a, rest = __rest(_a, ["id"]);
        const { notificacion } = __1.server.prisma;
        try {
            const notificacionResp = yield notificacion.create({
                data: rest
            });
            res.status(200).json({ notificacionResp });
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
        const { notificacion } = __1.server.prisma;
        try {
            yield notificacion.delete({ where: { id } });
            res.status(200).json({ msg: 'Recordatorio eliminado' });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                msg: 'Error de servidor'
            });
        }
    }),
};
