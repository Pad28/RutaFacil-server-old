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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const __1 = require("..");
const helpers_1 = require("../helpers");
const auth = {
    userLogin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { usuario, password } = req.body;
        const { prisma } = __1.server;
        try {
            const user = yield prisma.usuario.findFirst({
                where: {
                    OR: [{ correo: usuario }, { telefono: usuario },]
                }
            });
            if (!user) {
                return res.status(400).json({ msg: 'El usuario o contraseña no es valido' });
            }
            if (!user.estado) {
                return res.status(400).json({ msg: 'El usuario o contraseña no es valido' });
            }
            const validPassword = bcryptjs_1.default.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(400).json({ msg: 'El usuario o contraseña no es valido' });
            }
            const token = yield (0, helpers_1.generarUserJWT)(user.id);
            res.status(200).json({ user, token });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                msg: 'Error del servidor'
            });
        }
    }),
    validarToken: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.header('api-key');
        const { authenticatedUser } = req;
        res.status(200).json({ user: authenticatedUser, token });
    })
};
exports.default = auth;
