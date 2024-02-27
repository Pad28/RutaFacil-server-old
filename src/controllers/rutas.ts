// controllers
import { Request, Response } from "express";
import { server } from "..";
import { Prisma } from "@prisma/client";
import { capitalizar } from "../middlewares/capitalizar-nombre";

const rutas = {
    listar: async(req: Request, res: Response) => {
        const { prisma } = server;

        try {
            
            const [ total, rutas ] = await Promise.all([
                prisma.ruta.count({ where: { estado: true } }),
                prisma.ruta.findMany({ where: { estado: true } })
            ]); 

            res.status(200).json({ total, rutas });

        } catch (error) {
            res.status(500).json({
                msg: 'Error de servidor'
            });
        }

    },
    buscar: async(req: Request, res: Response) => {
        const { id } = req.params;
        const { prisma } = server;

        try {
            
            const ruta = await prisma.ruta.findUnique({ where: { numero: parseInt(id) } });
            res.status(200).json({ ruta });

        } catch (error) {
            res.status(500).json({
                msg: 'Error de servidor'
            });
        }
    
    },
    crear: async(req: Request, res: Response) => {
        const { numero, ...body } = req.body;
        const { prisma } = server;

        try {
            
            body.destino = capitalizar(body.destino);
            body.origen = capitalizar(body.origen);
            const ruta = await prisma.ruta.create({ data: body });
            res.status(200).json({ ruta });

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
        let { ...body } = req.body;
        const { prisma } = server;

        try {

            if(body.numero){                
                const validar = await prisma.ruta.findUnique({ where: { numero: body.numero } });
                if(validar){
                    return res.status(400).json({ msg: 'Numero de ruta no valido' });
                }
            }

            body.destino = (body.destino) && capitalizar(body.destino);
            body.origen = (body.origen) && capitalizar(body.origen); 
            const ruta = await prisma.ruta.update({ 
                where: { numero: parseInt(id) },
                data: body
            });

            res.status(200).json({ ruta })


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
        let { numero, ...body } = req.body;
        const { prisma } = server;

        try {
            
            // const ruta = await prisma.ruta.update({ 
            //     where: { numero: parseInt(id) },
            //     data: { estado: false }
            // });

            const ruta = await prisma.ruta.delete({ where: { numero: parseInt(id) } });

            res.status(200).json({ msg: 'Ruta eliminada' })

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
}

export default rutas;