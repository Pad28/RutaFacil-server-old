// Constrollers

import { Horario, Parada, Rol_Usuario, Ruta, Tipo_Horario, Tipo_Reporte, Usuario, Vehiculo } from "@prisma/client";
import { Request, Response } from "express";
import { server } from "..";

const modelosPermitidos = ['Usuario', 'Ruta', 'Horario', 'Parada', 'Vehiculo', 'RutaGuardada', 'Reporte', 'Notificacion'];

const buscarUsuarios = async(termino: string, res: Response) => {
    const { prisma } = server;

    try {
        let users: Usuario[] | null;

        users = await prisma.usuario.findMany({
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

        if(users.length === 0) {
            users = await prisma.usuario.findMany({
                where: { rol: termino as Rol_Usuario, estado: true }
            })
        }

        res.status(200).json({ users });

    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'Termino no valido' });
    }
}

const buscarRuta = async(termino: string, res: Response) => {
    const { prisma } = server;

    try {
        let rutas: Ruta[] | Ruta | null;
        if(!isNaN(parseInt(termino))) {
            console.log(termino);
            
            rutas = await prisma.ruta.findUnique({ 
                where: { 
                    numero: parseInt(termino), 
                    AND: { estado: true } 
                },  
            });
            return res.status(200).json({ rutas });
        }

        rutas = await prisma.ruta.findMany({
            where: {
                OR: [
                    { id: termino },
                    { destino: { contains: termino } },
                    { origen: { contains: termino } },
                ],
                AND: { estado: true }
               
            }
        });

        if(rutas.length === 0) {
            rutas = await prisma.ruta.findMany({
                where: { estado: (termino === 'true') ? true : false }
            }); 
        }

        if(termino === '*') {
            rutas = await prisma.ruta.findMany();
        }
        

        res.status(200).json({ rutas });

    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'Termino no valido' });
    }
}

const buscarHorario = async(termino: string, res: Response) => {
    const { prisma } = server;

    try {   
        let horarios: Horario[];
        if(!isNaN(parseInt(termino))) {
            horarios = await prisma.horario.findMany({ where: { numero_ruta: parseInt(termino) } });
            return res.status(200).json({ horarios });
        }

        horarios = await prisma.horario.findMany({
            where: {
                OR: [
                    { dia_hora: termino },
                    { id: termino },
                    { id_ruta: termino },
                ]
            }
        });

        res.status(200).json({ horarios });


    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'Termino no valido' });
    }

}

const buscarParadas = async(termino: string, res: Response) => {
    const { prisma } = server;

    try {   

        let paradas: Parada[];
        if(!isNaN(parseInt(termino))) {
            paradas = await prisma.parada.findMany({ where: { numero_ruta: parseInt(termino) } });
            return res.status(400).json({ paradas });
        }
        
        paradas = await prisma.parada.findMany({
            where: {
                OR: [
                    { id: termino },
                    { nombre_calle: { contains: termino } },
                    { id_ruta: termino }
                ]
            }
        })

        res.status(200).json({ paradas });


    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'Termino no valido' });
    }
}

const buscarVehiculo = async(termino: string, res: Response) => {
    const { prisma } = server;

    try {

        let vehiculos: Vehiculo[] | null;
        if(!isNaN(parseInt(termino))) {
            vehiculos = await prisma.vehiculo.findMany({ where: { 
                OR: [
                    { numero_ruta: parseInt(termino) },
                    { numero: parseInt(termino) }
                ]
            }});
            return res.status(400).json({ vehiculos });
        }
        
        vehiculos = await prisma.vehiculo.findMany({
            where: {
                OR: [
                    { nombre_chofer: { contains: termino } },
                    { apellidos_chofer: { contains: termino } },
                    { id_ruta: termino }
                ]
            }
        })

        res.status(200).json({ vehiculos });

        
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'Termino no valido' });
    }

}

const buscarRutasGuardadas = async(termino: string, res: Response) => {
    const { prisma } = server;

    try {
        
        const rutas = await prisma.rutaGuardada.findMany({
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

    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'Termino no valido' });
    }

}

const buscarReportes = async(termino: string, res: Response) => {
    const { reporte } = server.prisma;

    try {
        
        if(['QUEJA', 'SUGERENCIA'].includes(termino)) {
            const reportes = await reporte.findMany({
                where: {
                    tipo: termino as Tipo_Reporte
                }
            });

            return res.status(200).json({ reportes });
        }
        
        const reportes = await reporte.findMany({
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

    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'Termino no valido' });
    }
}

const buscarNotifiacion = async(termino: string, res: Response) => {
    const { notificacion } = server.prisma;

    try {
        
        if(['PM', 'AM'].includes(termino)) {
            const notificaiones = await notificacion.findMany({
                where: {
                    horario: termino as Tipo_Horario
                },
                include: {
                    fk_ruta: true
                }
            });

            return res.status(200).json({ notificaiones });
        }
        
        const notificaiones = await notificacion.findMany({
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

    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'Termino no valido' });
    }
} 

const busquedas = {
    search: async(req: Request, res: Response) => {
        const { modelo, termino } = req.params;
        const user = req.authenticatedUser;

        try {
            
            if(!modelosPermitidos.includes(modelo)) {
                return res.status(400).json({
                    msg: 'Los modelos permitidos son: ' + modelosPermitidos
                });
            }

            switch (modelo) {
                case 'Usuario':
                    if(user.rol !== 'ADMIN') {
                        return res.status(401).json({ msg: 'Acceso denegado' })
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
                    if(user.rol !== 'ADMIN') {
                        return res.status(401).json({ msg: 'Acceso denegado' })
                    }
                    buscarReportes(termino, res);
                    break;

                case 'Notificacion': 
                    buscarNotifiacion(termino, res);
                    break;
            }

        } catch (error) {
            console.log(error);
            res.status(500).json({
                msg: 'Error del servidor'
            });
        }

    }
}

export default busquedas;