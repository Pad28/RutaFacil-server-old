"use strict";
// Constrollers
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
const modelosPermitidos = ['Usuario', 'Ruta', 'Horario', 'Parada', 'Vehiculo', 'RutaGuardada', 'Reporte', 'Notificacion'];
const buscarUsuarios = (termino, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { prisma } = __1.server;
    try {
        let users;
        users = yield prisma.usuario.findMany({
            where: {
                OR: [
                    { id: termino },
                    { nombre: { contains: termino } },
                    { apellidos: { contains: termino } },
                    { correo: { contains: termino } },
                    { telefono: { contains: termino } },
                ],
                estado: true
            }
        });
        if (users.length === 0) {
            users = yield prisma.usuario.findMany({
                where: { rol: termino, estado: true }
            });
        }
        res.status(200).json({ users });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'Termino no valido' });
    }
});
const buscarRuta = (termino, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { prisma } = __1.server;
    try {
        let rutas;
        if (!isNaN(parseInt(termino))) {
            console.log(termino);
            rutas = yield prisma.ruta.findUnique({
                where: {
                    numero: parseInt(termino),
                    AND: { estado: true }
                },
            });
            return res.status(200).json({ rutas });
        }
        rutas = yield prisma.ruta.findMany({
            where: {
                OR: [
                    { id: termino },
                    { destino: { contains: termino } },
                    { origen: { contains: termino } },
                ],
                AND: { estado: true }
            }
        });
        if (rutas.length === 0) {
            rutas = yield prisma.ruta.findMany({
                where: { estado: (termino === 'true') ? true : false }
            });
        }
        if (termino === '*') {
            rutas = yield prisma.ruta.findMany();
        }
        res.status(200).json({ rutas });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'Termino no valido' });
    }
});
const buscarHorario = (termino, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { prisma } = __1.server;
    try {
        let horarios;
        if (!isNaN(parseInt(termino))) {
            horarios = yield prisma.horario.findMany({ where: { numero_ruta: parseInt(termino) } });
            return res.status(200).json({ horarios });
        }
        horarios = yield prisma.horario.findMany({
            where: {
                OR: [
                    { dia_hora: termino },
                    { id: termino },
                    { id_ruta: termino },
                ]
            }
        });
        res.status(200).json({ horarios });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'Termino no valido' });
    }
});
const buscarParadas = (termino, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { prisma } = __1.server;
    try {
        let paradas;
        if (!isNaN(parseInt(termino))) {
            paradas = yield prisma.parada.findMany({ where: { numero_ruta: parseInt(termino) } });
            return res.status(400).json({ paradas });
        }
        paradas = yield prisma.parada.findMany({
            where: {
                OR: [
                    { id: termino },
                    { nombre_calle: { contains: termino } },
                    { id_ruta: termino }
                ]
            }
        });
        res.status(200).json({ paradas });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'Termino no valido' });
    }
});
const buscarVehiculo = (termino, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { prisma } = __1.server;
    try {
        let vehiculos;
        if (!isNaN(parseInt(termino))) {
            vehiculos = yield prisma.vehiculo.findMany({ where: {
                    OR: [
                        { numero_ruta: parseInt(termino) },
                        { numero: parseInt(termino) }
                    ]
                } });
            return res.status(400).json({ vehiculos });
        }
        vehiculos = yield prisma.vehiculo.findMany({
            where: {
                OR: [
                    { nombre_chofer: { contains: termino } },
                    { apellidos_chofer: { contains: termino } },
                    { id_ruta: termino }
                ]
            }
        });
        res.status(200).json({ vehiculos });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'Termino no valido' });
    }
});
const buscarRutasGuardadas = (termino, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { prisma } = __1.server;
    try {
        const rutas = yield prisma.rutaGuardada.findMany({
            where: {
                OR: [
                    { id: termino },
                    { id_usuario: termino },
                    { id_ruta: termino }
                ]
            },
            include: {
                ruta_fk: true
            }
        });
        res.status(200).json({ rutas });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'Termino no valido' });
    }
});
const buscarReportes = (termino, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { reporte } = __1.server.prisma;
    try {
        if (['QUEJA', 'SUGERENCIA'].includes(termino)) {
            const reportes = yield reporte.findMany({
                where: {
                    tipo: termino
                }
            });
            return res.status(200).json({ reportes });
        }
        const reportes = yield reporte.findMany({
            where: {
                OR: [
                    { id: termino },
                    { id_usuario: termino },
                    { fecha: termino },
                    { descripcion: { contains: termino } }
                ]
            }
        });
        return res.status(200).json({ reportes });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'Termino no valido' });
    }
});
const buscarNotifiacion = (termino, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { notificacion } = __1.server.prisma;
    try {
        if (['PM', 'AM'].includes(termino)) {
            const notificaiones = yield notificacion.findMany({
                where: {
                    horario: termino
                },
                include: {
                    fk_ruta: true
                }
            });
            return res.status(200).json({ notificaiones });
        }
        const notificaiones = yield notificacion.findMany({
            where: {
                OR: [
                    { id: termino },
                    { id_usuario: termino },
                ]
            },
            include: {
                fk_ruta: true
            }
        });
        return res.status(200).json({ notificaiones });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'Termino no valido' });
    }
});
const busquedas = {
    search: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { modelo, termino } = req.params;
        const user = req.authenticatedUser;
        try {
            if (!modelosPermitidos.includes(modelo)) {
                return res.status(400).json({
                    msg: 'Los modelos permitidos son: ' + modelosPermitidos
                });
            }
            switch (modelo) {
                case 'Usuario':
                    if (user.rol !== 'ADMIN') {
                        return res.status(401).json({ msg: 'Acceso denegado' });
                    }
                    buscarUsuarios(termino, res);
                    break;
                case 'Ruta':
                    buscarRuta(termino, res);
                    break;
                case 'Horario':
                    buscarHorario(termino, res);
                    break;
                case 'Parada':
                    buscarParadas(termino, res);
                    break;
                case 'Vehiculo':
                    buscarVehiculo(termino, res);
                    break;
                case 'RutaGuardada':
                    buscarRutasGuardadas(termino, res);
                    break;
                case 'Reporte':
                    if (user.rol !== 'ADMIN') {
                        return res.status(401).json({ msg: 'Acceso denegado' });
                    }
                    buscarReportes(termino, res);
                    break;
                case 'Notificacion':
                    buscarNotifiacion(termino, res);
                    break;
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                msg: 'Error del servidor'
            });
        }
    })
};
exports.default = busquedas;
