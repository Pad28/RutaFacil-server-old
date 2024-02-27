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
const capitalizar_nombre_1 = require("../middlewares/capitalizar-nombre");
const client_1 = require("@prisma/client");
const vehiculos = {
    listar: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { prisma } = __1.server;
        try {
            const [total, vehiculos] = yield Promise.all([
                prisma.vehiculo.count(),
                prisma.vehiculo.findMany(),
            ]);
            res.status(200).json({ total, vehiculos });
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
            const vehiculo = yield prisma.vehiculo.findUnique({ where: { numero: parseInt(id) } });
            res.status(200).json({ vehiculo });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                msg: 'Error de servidor'
            });
        }
    }),
    crear: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const _a = req.body, { id, numero_ruta, correo_usuario } = _a, rest = __rest(_a, ["id", "numero_ruta", "correo_usuario"]);
        const { prisma } = __1.server;
        try {
            const id_ruta = yield prisma.ruta.findUnique({ where: { numero: numero_ruta } });
            if (!id_ruta) {
                return res.status(400).json({ msg: 'Numero de ruta no valido' });
            }
            const usuario = yield prisma.usuario.findUnique({ where: { correo: correo_usuario } });
            rest.id_ruta = id_ruta.id;
            rest.nombre_chofer = (0, capitalizar_nombre_1.capitalizar)(usuario.nombre);
            rest.apellidos_chofer = (0, capitalizar_nombre_1.capitalizar)(usuario.apellidos);
            rest.id_usuario = usuario.id;
            rest.numero_ruta = numero_ruta;
            const parada = yield prisma.vehiculo.create({ data: rest });
            res.status(200).json({ parada });
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
        const _b = req.body, { numero_ruta } = _b, rest = __rest(_b, ["numero_ruta"]);
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
            if (rest.correo_usuario) {
                const user = yield prisma.usuario.findUnique({ where: { correo: rest.correo_usuario } });
                if (!user || user.rol !== 'CHOFER') {
                    return res.status(400).json({ msg: 'Chofer no valido' });
                }
                rest.nombre_chofer = user.nombre;
                rest.apellidos_chofer = user.apellidos;
                rest.id_usuario = user.id;
            }
            const vehiculo = yield prisma.vehiculo.update({
                where: { numero: parseInt(id) },
                data: rest
            });
            res.status(200).json({ vehiculo });
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
            yield prisma.vehiculo.delete({ where: { numero: parseInt(id) } });
            res.status(200).json({ msg: 'Vehiculo eliminado' });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                msg: 'Error de servidor'
            });
        }
    }),
};
exports.default = vehiculos;
