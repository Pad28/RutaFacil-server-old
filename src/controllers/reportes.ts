// Controllers

import { Request, Response } from "express";
import { server } from "..";
import { Prisma } from "@prisma/client";
import { validators } from "../helpers";

const reportes = {
    listar: async(req: Request, res: Response) => {
        const { reporte } = server.prisma;

        try {
            
            const [ total, reportes ] = await Promise.all([
                reporte.count(),
                reporte.findMany()
            ]);

            res.status(200).json({ total, reportes });

        } catch (error) {
            res.status(500).json({
                msg: 'Error de servidor'
            });   
        }
    },  
    buscar: async(req: Request, res: Response) => {
        const { id } = req.params;
        const { reporte } = server.prisma;

        try {
            
            const report = await reporte.findUnique({ where: { id } });
            res.status(200).json({ report });

        } catch (error) {
            
        }
    },
    crear: async(req: Request, res: Response) => {
        const { id, fecha, ...rest } = req.body;
        const { reporte } = server.prisma;

        try {
        
        rest.fecha = new Date().toISOString();

        const report = await reporte.create({ data: rest });
        res.status(200).json({ report })
            
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
        const { body } = req;
        const { reporte, usuario } = server.prisma;

        try {
            
            if( body.id_usuario ) {
                const user = await usuario.findUnique({ where: { id: body.id_usuario } });
                if(!user) {
                    res.status(401).json({
                        msg: 'No existe un usuario con el ID: ' + body.id_usuario
                    });
                }
            }

            if(!['QUEJA', 'SUGERENCIA'].includes(body.tipo)) {
                res.status(401).json({ msg: 'El tipo de reporte no es valido' });
            }

            const report = await reporte.update({
                where: { id },
                data: body
            });

            res.status(200).json({ report });

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
        const { reporte } = server.prisma;

        try {
            
            await reporte.delete({ where: { id } });

            res.status(200).json({
                msg: 'Usuario eliminado'
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                msg: 'Error de servidor'
            });
        }

    },
}

export default reportes;