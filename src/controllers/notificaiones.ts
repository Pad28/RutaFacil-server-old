// Controllers
import { Request, Response } from "express";
import { server } from "..";
import { Prisma } from "@prisma/client";

export const notificaiones = {
    listar: async(req: Request, res: Response) => {
        const { notificacion } = server.prisma;
        
        try {
            
            const [total, notificaiones] = await Promise.all([
                notificacion.count(),
                notificacion.findMany()
            ]);

            res.status(200).json({ total, notificaiones });
            

        } catch (error) {
            console.log(error);
            res.status(500).json({
                msg: 'Error de servidor'
            });
        }
    },
    crear: async(req: Request, res: Response) => {
        const{ id, ...rest} = req.body;
        const { notificacion } = server.prisma;

        try {

            const notificacionResp = await notificacion.create({
                data: rest
            });

            res.status(200).json({notificacionResp});

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
        const { notificacion } = server.prisma;
        
        try {
            
            await notificacion.delete({ where: { id } });
            res.status(200).json({ msg: 'Recordatorio eliminado' });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                msg: 'Error de servidor'
            });
        }

    },
    
};