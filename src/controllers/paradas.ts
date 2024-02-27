// controllers

import { Request, Response } from "express";
import { server } from "..";
import { Prisma } from "@prisma/client";
import { capitalizar } from "../middlewares/capitalizar-nombre";

const paradas = {
    listar: async(req: Request, res: Response) => {
        const { prisma } = server;

        try {
            
            const [ total, paradas ] = await Promise.all([
                prisma.parada.count(),
                prisma.parada.findMany()
            ]);

            res.status(200).json({ total, paradas });

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
            
            const parada = await prisma.parada.findUnique({ where: { id } });

            res.status(200).json({ parada });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                msg: 'Error de servidor'
            });   
        }

    },
    crear: async(req: Request, res: Response) => {
        const { id, numero_ruta, ...rest } = req.body;
        const { prisma } = server;

        try {
            
            const id_ruta = await prisma.ruta.findUnique({ where: { numero: numero_ruta } });
            if(!id_ruta) {
                return res.status(400).json({ msg: 'Numero de ruta no valido' });
            }
            rest.id_ruta = id_ruta.id;
            rest.nombre_calle = capitalizar(rest.nombre_calle);
            rest.numero_ruta = numero_ruta;

            const parada = await prisma.parada.create({ data: rest });
            res.status(200).json({ parada });

        } catch (error) {
            console.log(error);
            if(error instanceof Prisma.PrismaClientValidationError) {
                return res.status(400).json({
                    msg: 'Atributos no validos'
                })
            }

            res.status(500).json({
                msg: 'Error de servidor'
            });
        }

    },
    modificar: async(req: Request, res: Response) => {
        const { id } = req.params;
        const{ numero_ruta, ...rest } = req.body;
        const { prisma } = server;

        try {
            
            if(numero_ruta) {
                const id_ruta = await prisma.ruta.findUnique({ where: { numero: numero_ruta } });
                if(!id_ruta) {
                    return res.status(400).json({ msg: 'Numero de ruta no valido' });
                }
                rest.id_ruta = id_ruta.id;
                rest.numero_ruta = numero_ruta;
            }

            if(rest.nombre_calle) {
                rest.nombre_calle = capitalizar(rest.nombre_calle);
            }            

            const parada = await prisma.parada.update({ 
                where: { id }, 
                data: rest 
            });
            res.status(200).json({ parada });

        } catch (error) {
            console.log(error);
            if(error instanceof Prisma.PrismaClientValidationError) {
                return res.status(400).json({
                    msg: 'Atributos no validos'
                })
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
            
            await prisma.parada.delete({ where: { id } });
            res.status(200).json({ msg: 'Parada eliminada' });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                msg: 'Error de servidor'
            });
        }

    }
}

export default paradas;