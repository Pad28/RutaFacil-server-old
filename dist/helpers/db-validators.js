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
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const validators = {
    verificarEmailRepetido: (correo) => __awaiter(void 0, void 0, void 0, function* () {
        const validar = yield __1.server.prisma.usuario.findUnique({
            where: { correo }
        });
        if (validar) {
            throw new Error(`El correo ${correo} ya fue registrado anteriormente`);
        }
    }),
    varficarEmailExiste: (correo) => __awaiter(void 0, void 0, void 0, function* () {
        const validar = yield __1.server.prisma.usuario.findUnique({
            where: { correo }
        });
        if (!validar) {
            throw new Error(`El correo ${correo} no existe`);
        }
    }),
    verficarTelefonoRepetido: (telefono) => __awaiter(void 0, void 0, void 0, function* () {
        const validar = yield __1.server.prisma.usuario.findUnique({ where: { telefono } });
        if (validar) {
            throw new Error(`El telefono ${telefono} ya fue registrado anteriormente`);
        }
    }),
    verificarIDExiste: (id, model) => __awaiter(void 0, void 0, void 0, function* () {
        let validar = null;
        switch (model) {
            case "Usuario":
                validar = yield __1.server.prisma.usuario.findUnique({ where: { id } });
                break;
            case "Ruta":
                validar = yield __1.server.prisma.ruta.findUnique({ where: { numero: parseInt(id) } });
                break;
            case "Horario":
                validar = yield __1.server.prisma.horario.findUnique({ where: { id } });
                break;
            case "Parada":
                validar = yield __1.server.prisma.parada.findUnique({ where: { id } });
                break;
            case "Vehiculo":
                validar = yield __1.server.prisma.vehiculo.findUnique({ where: { numero: parseInt(id) } });
                break;
            case 'RutaGuardada':
                validar = yield __1.server.prisma.rutaGuardada.findUnique({ where: { id } });
                break;
            case 'Reporte':
                validar = yield __1.server.prisma.reporte.findUnique({ where: { id } });
                break;
        }
        if (!validar) {
            throw new Error('No existe el ID: ' + id);
        }
    }),
    validarEnum: (list, value) => __awaiter(void 0, void 0, void 0, function* () {
        if (!list.includes(value)) {
            throw new Error('El tipo de reporte no es valido');
        }
    })
};
exports.default = validators;
