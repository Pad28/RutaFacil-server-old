import { PrismaClient } from '@prisma/client';
import express, { Application, Request, Response } from 'express'
import cors from 'cors';
import fileUpload from 'express-fileupload';

import { 
    horariosRoutes,
    reportesRoutes,
    rutasRoutes,
    rutasGuardadasRoutes,
    paradasRoutes,
    usuarioRoutes, 
    vehiculosRoutes,
    busquedasRoutes,
    authRoutes,
    uploadsRoutes,
    notificaionesRoutes
} from '../routes';

class Server {
    private app: Application;
    private port: string;
    private apiPaths = {
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
    }

    public prisma: PrismaClient;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3000';
        
        // Coneccion a la base de datos
        this.prisma = new PrismaClient();
        this.connectionDB();

        this.middlewares();
        this.routes();
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Lectura de body, conversion a JSON
        this.app.use(express.json());

        // Contenido estatico
        this.app.use(express.static('public'));

        // Carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true,
        }));
    }

    routes() {
        this.app.use(this.apiPaths.auth, authRoutes)
        this.app.use(this.apiPaths.busquedas, busquedasRoutes);
        this.app.use(this.apiPaths.horarios, horariosRoutes);
        this.app.use(this.apiPaths.reportes, reportesRoutes);
        this.app.use(this.apiPaths.rutas, rutasRoutes);
        this.app.use(this.apiPaths.rutasGuardadas, rutasGuardadasRoutes);
        this.app.use(this.apiPaths.paradas, paradasRoutes)
        this.app.use(this.apiPaths.usuarios, usuarioRoutes);
        this.app.use(this.apiPaths.uploads, uploadsRoutes);
        this.app.use(this.apiPaths.vehiculos, vehiculosRoutes);
        this.app.use(this.apiPaths.notificaiones, notificaionesRoutes);

        this.app.get('*', (req: Request, res: Response) => {
            res.status(404).send('<h1>404 | Not found</h1>');
        });
    }

    connectionDB() {
        try {
            this.prisma.$connect();
            console.log('Base de datos online');
            
        } catch (error) {
            console.log('Error al conectar la base de datos: \n' + error);
        }
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor escuchando en puerto: ' + this.port);
            
        });
    }

}

export default Server;