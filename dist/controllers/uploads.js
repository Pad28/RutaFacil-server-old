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
// Controllers
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const helpers_1 = require("../helpers");
const __1 = require("..");
const uploads = {
    cargarArchivo: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const { prisma } = __1.server;
        if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
            res.status(400).json({ msg: 'No hay archivos que subir' });
            return;
        }
        try {
            const nombreArchivo = yield (0, helpers_1.subirArchivo)(req.files, ['png', 'jpg', 'jpeg'], 'usuarios');
            const user = yield prisma.usuario.findUnique({ where: { id } });
            (0, helpers_1.limpiarImg)(user.foto);
            yield prisma.usuario.update({ where: { id }, data: { foto: nombreArchivo } });
            // res.status(200).sendFile(path.resolve('uploads/usuarios/' + nombreArchivo));
            res.status(200).json({ nombreArchivo });
        }
        catch (error) {
            res.status(400).json({ error });
        }
    }),
    verFotoUsuario: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const { prisma } = __1.server;
        try {
            const user = yield prisma.usuario.findUnique({ where: { id } });
            let img;
            if (user.foto !== 'default_user.png') {
                img = path_1.default.resolve(`uploads/usuarios/${user === null || user === void 0 ? void 0 : user.foto}`);
                if (!fs_1.default.existsSync(img)) {
                    return res.status(401).json({ msg: `No existe la imagen ${img}` });
                }
                return res.status(200).sendFile(img);
            }
            img = path_1.default.resolve(`assets/default_user.png`);
            res.status(200).sendFile(img);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ msg: 'Error de servidor' });
        }
    }),
};
exports.default = uploads;
