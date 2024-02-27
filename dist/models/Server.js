"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const routes_1 = require("../routes");
class Server {
    constructor() {
        this.apiPaths = {
            auth: '/api/auth',
            busquedas: '/api/busquedas',
            horarios: '/api/horarios',
            reportes: '/api/reportes',
            rutas: '/api/rutas',
            rutasGuardadas: '/api/rutas-guardadas',
            paradas: '/api/paradas',
            usuarios: '/api/usuarios',
            uploads: '/api/uploads',
            vehiculos: '/api/vehiculos',
            notificaiones: '/api/notificaciones'
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3000';
        // Coneccion a la base de datos
        this.prisma = new client_1.PrismaClient();
        this.connectionDB();
        this.middlewares();
        this.routes();
    }
    middlewares() {
        // CORS
        this.app.use((0, cors_1.default)());
        // Lectura de body, conversion a JSON
        this.app.use(express_1.default.json());
        // Contenido estatico
        this.app.use(express_1.default.static('public'));
        // Carga de archivos
        this.app.use((0, express_fileupload_1.default)({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true,
        }));
    }
    routes() {
        this.app.use(this.apiPaths.auth, routes_1.authRoutes);
        this.app.use(this.apiPaths.busquedas, routes_1.busquedasRoutes);
        this.app.use(this.apiPaths.horarios, routes_1.horariosRoutes);
        this.app.use(this.apiPaths.reportes, routes_1.reportesRoutes);
        this.app.use(this.apiPaths.rutas, routes_1.rutasRoutes);
        this.app.use(this.apiPaths.rutasGuardadas, routes_1.rutasGuardadasRoutes);
        this.app.use(this.apiPaths.paradas, routes_1.paradasRoutes);
        this.app.use(this.apiPaths.usuarios, routes_1.usuarioRoutes);
        this.app.use(this.apiPaths.uploads, routes_1.uploadsRoutes);
        this.app.use(this.apiPaths.vehiculos, routes_1.vehiculosRoutes);
        this.app.use(this.apiPaths.notificaiones, routes_1.notificaionesRoutes);
        this.app.get('*', (req, res) => {
            res.status(404).send('<h1>404 | Not found</h1>');
        });
    }
    connectionDB() {
        try {
            this.prisma.$connect();
            console.log('Base de datos online');
        }
        catch (error) {
            console.log('Error al conectar la base de datos: \n' + error);
        }
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor escuchando en puerto: ' + this.port);
        });
    }
}
exports.default = Server;
