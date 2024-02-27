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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const __1 = require("..");
const capitalizar_nombre_1 = require("../middlewares/capitalizar-nombre");
const usuarios = {
    listar: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { prisma } = __1.server;
            const [total, users] = yield Promise.all([
                prisma.usuario.count({ where: { estado: true } }),
                prisma.usuario.findMany({ where: { estado: true } })
            ]);
            res.status(200).json({
                total,
                users
            });
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
            const user = yield prisma.usuario.findUnique({ where: { id } });
            res.status(200).json({
                user
            });
        }
        catch (error) {
            res.status(500).json({
                msg: 'Error de servidor'
            });
        }
    }),
    crear: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const _a = req.body, { id, estado } = _a, body = __rest(_a, ["id", "estado"]);
        try {
            const { prisma } = __1.server;
            // Encriptar constraseña
            const salt = bcryptjs_1.default.genSaltSync(15);
            body.password = bcryptjs_1.default.hashSync(body.password, salt);
            body.foto = 'default_user.png';
            // /[a-z0-9-_.]+@[a-z]+(|.[a-z]{2,3}){1,2}/g
            if (!body.correo.includes('@')) {
                return res.status(400).json({
                    msg: 'Correo no valido'
                });
            }
            const user = yield prisma.usuario.create({ data: body });
            res.status(200).json({ user });
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
        const token = req.header('api-key');
        const _b = req.body, { estado } = _b, body = __rest(_b, ["estado"]);
        const { prisma } = __1.server;
        try {
            const aux = yield prisma.usuario.findUnique({ where: { id } });
            if (body.password || body.password === '') {
                if (body.password.length < 1 || body.password === '') {
                    body.password = aux.password;
                }
                else {
                    const salt = bcryptjs_1.default.genSaltSync(15);
                    body.password = bcryptjs_1.default.hashSync(body.password, salt);
                }
            }
            if (body.correo && body.correo !== aux.correo) {
                const correo = yield prisma.usuario.findUnique({ where: { correo: body.correo } });
                if (correo || !body.correo.includes('@')) {
                    return res.status(400).json({
                        msg: 'Correo no valido'
                    });
                }
            }
            if (body.telefono && body.telefono !== aux.telefono) {
                const tel = yield prisma.usuario.findUnique({ where: { telefono: body.telefono } });
                if (tel) {
                    return res.status(400).json({
                        msg: 'Telefono no valido'
                    });
                }
            }
            if (body.nombre) {
                body.nombre = (0, capitalizar_nombre_1.capitalizar)(body.nombre);
            }
            const user = yield prisma.usuario.update({
                where: { id },
                data: body
            });
            res.status(200).json({ user, token });
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
            yield prisma.usuario.update({
                where: { id },
                data: { estado: false }
            });
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
exports.default = usuarios;
