// controllers

import { Prisma } from "@prisma/client";
import e, { Request, Response } from "express";
import { server } from "..";

const horarios = {
    listar: async(req: Request, res: Response) => {
        const { prisma } = server;

        try {
            
            const [total, hoarios] = await Promise.all([
                prisma.horario.count(),
                prisma.horario.findMany()
            ]);

            res.status(200).json({ total, hoarios });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                msg: 'Error de servidor'
            });
        }

    },
    buscar: async(req: Request, res: Response) => {
        const { id } = req.params;
        const { prisma } = server;

        try {
            
            const horario = await prisma.horario.findUnique({ where: { id } });
            res.status(200).json({ horario });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                msg: 'Error de servidor'
            });
        }

    },
    crear: async(req: Request, res: Response) => {
        const{ id, estado, numero_ruta, dia_hora, } = req.body;
        const { prisma } = server;

        try {
            const rutaID = await prisma.ruta.findUnique({ where: { numero: numero_ruta  }, select: { id: true } });            
            if(!rutaID) {
                return res.status(400).json({
                    msg: 'Numero de ruta no valido'
                });
            }

            const horario = await prisma.horario.create({ 
                data: {
                    id_ruta: rutaID.id,
                    dia_hora,
                    numero_ruta
                }
            });

            res.status(200).json({ horario })

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
        const { numero_ruta, ...rest } = req.body;
        const { prisma } = server;

        try {
            
            if(numero_ruta) {
                const rutaID = await prisma.ruta.findUnique({ where: { numero: numero_ruta } });
                if(!rutaID) {
                    return res.status(400).json({ msg: 'Numero de ruta no valido' });
                }

                rest.id_ruta = rutaID.id;
                rest.numero_ruta = numero_ruta;
            }

            const horario = await prisma.horario.update({
                where: { id },
                data: rest
            });

            res.status(200).json({ horario });

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
            
            await prisma.horario.delete({ where: { id } });
            res.status(200).json({ msg: 'Horario eliminado' });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                msg: 'Error de servidor'
            });
        }

    },
}

export default horarios;