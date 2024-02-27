// Controllers
import { Request, Response } from "express";
import { server } from "..";
import { Prisma } from "@prisma/client";

const rutasGuardadas = {
    listar: async(req: Request, res: Response) => {
        const { prisma } = server;

        try {
            
            const [total, rutas_guardadas] = await Promise.all([
                prisma.rutaGuardada.count(),
                prisma.rutaGuardada.findMany()
            ]);

            res.status(200).json({ total, rutas_guardadas });
            
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: 'Error de servidor' });
        }

    },
    buscar: async(req: Request, res: Response) => {
        const { id } = req.params;
        const { prisma } = server;

        try {
            
            const ruta_gurdada = await prisma.rutaGuardada.findUnique({ where: { id } });
            res.status(200).json(ruta_gurdada);

        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: 'Error de servidor' });
        }

    },
    crear: async(req: Request, res: Response) => {
        let { id, id_usuario, id_ruta } = req.body;
        const { prisma } = server;

        try {

            const rutaGuardada = await prisma.rutaGuardada.create({
                data: { id_usuario, id_ruta }
            });
                
            res.status(200).json({ ruta_guardada: rutaGuardada })
            
        } catch (error) {
            console.log(error);
            if(error instanceof Prisma.PrismaClientValidationError){
                return res.status(400).json({
                    msg: 'Atributos no validos',
                });
            }

            res.status(500).json({
                msg: 'Error de servidor'
            });
        }

    },
    modificar: async(req: Request, res: Response) => {
        const { id } = req.params;
        const { correo_usuario, numero_ruta, ...rest }  = req.body;
        const { prisma } = server;

        try {
            
            if(correo_usuario) {
                const user = await prisma.usuario.findUnique({ where: { correo: correo_usuario } });
                if(!user) {
                    return res.status(400).json({ msg: 'Usuario no valido' });
                }
                rest.id_usuario = user.id;
            }

            if(numero_ruta) {
                const ruta = await prisma.ruta.findUnique({ where: { numero: numero_ruta } });
                if(!ruta) {
                    return res.status(400).json({ msg: 'Ruta no valida' });
                }
                rest.id_ruta = ruta.id;
            }

            const ruta_guardada = await prisma.rutaGuardada.update({ 
                where: { id },
                data: rest
            })

            res.status(200).json({ ruta_guardada });

        } catch (error) {
            console.log(error);
            if(error instanceof Prisma.PrismaClientValidationError){
                return res.status(400).json({
                    msg: 'Atributos no validos',
                });
            }

            res.status(500).json({
                msg: 'Error de servidor'
            });
        }

    },
    delete: async(req: Request, res: Response) => {
        const { id } = req.params;
        const { prisma } = server;

        try {
            
            await prisma.rutaGuardada.delete({
                where: { id_ruta: id }
            });
            res.status(200).json({ msg: 'Ruta Eliminada' });

        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: 'Error de servidor' });
        }
    },
    
}

export default rutasGuardadas;