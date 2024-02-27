"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const subirArchivo = (files, extencionesValidas, carpeta) => {
    return new Promise((resolve, reject) => {
        const { archivo } = files;
        if (!Array.isArray(archivo)) {
            const nombreCortado = archivo.name.split('.');
            const extension = nombreCortado[nombreCortado.length - 1];
            // Validar extencion
            if (!extencionesValidas.includes(extension)) {
                return reject(`La extencion ${extension} no es valida, ingresa imagenes con extencion ${extencionesValidas}`);
            }
            const fileName = (0, uuid_1.v4)() + '.' + extension;
            const uploadPath = path_1.default.resolve('uploads', carpeta, fileName);
            archivo.mv(uploadPath, err => {
                if (err) {
                    console.log(err);
                    return reject('Ocurrio un error al subir la imagen al servidor :(');
                }
                resolve(fileName);
            });
        }
        else {
            reject('Demasiados archivos');
        }
    });
};
exports.default = subirArchivo;
