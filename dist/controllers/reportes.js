"use strict";
// Controllers
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
const reportes = {
    listar: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { reporte } = __1.server.prisma;
        try {
            const [total, reportes] = yield Promise.all([
                reporte.count(),
                reporte.findMany()
            ]);
            res.status(200).json({ total, reportes });
        }
        catch (error) {
            res.status(500).json({
                msg: 'Error de servidor'
            });
        }
    }),
    buscar: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const { reporte } = __1.server.prisma;
        try {
            const report = yield reporte.findUnique({ where: { id } });
            res.status(200).json({ report });
        }
        catch (error) {
        }
    }),
    crear: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const _a = req.body, { id, fecha } = _a, rest = __rest(_a, ["id", "fecha"]);
        const { reporte } = __1.server.prisma;
        try {
            rest.fecha = new Date().toISOString();
            const report = yield reporte.create({ data: rest });
            res.status(200).json({ report });
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
        const { body } = req;
        const { reporte, usuario } = __1.server.prisma;
        try {
            if (body.id_usuario) {
                const user = yield usuario.findUnique({ where: { id: body.id_usuario } });
                if (!user) {
                    res.status(401).json({
                        msg: 'No existe un usuario con el ID: ' + body.id_usuario
                    });
                }
            }
            if (!['QUEJA', 'SUGERENCIA'].includes(body.tipo)) {
                res.status(401).json({ msg: 'El tipo de reporte no es valido' });
            }
            const report = yield reporte.update({
                where: { id },
                data: body
            });
            res.status(200).json({ report });
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
        const { reporte } = __1.server.prisma;
        try {
            yield reporte.delete({ where: { id } });
            res.status(200).json({
                msg: 'Usuario eliminado'
            });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                msg: 'Error de servidor'
            });
        }
    }),
};
exports.default = reportes;
