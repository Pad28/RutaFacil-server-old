// Controllers

import { Request, Response } from "express";
import { server } from "..";
import { capitalizar } from "../middlewares/capitalizar-nombre";
import { Prisma } from "@prisma/client";

const vehiculos = {
    listar: async(req: Request, res: Response) => {
        const { prisma } = server;

        try {

            const [total, vehiculos] = await Promise.all([
                prisma.vehiculo.count(),
                prisma.vehiculo.findMany(),
            ]);
            res.status(200).json({ total, vehiculos });
            
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
            
            const vehiculo = await prisma.vehiculo.findUnique({ where: { numero: parseInt(id) } });

            res.status(200).json({ vehiculo });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                msg: 'Error de servidor'
            });   
        }

    },
    crear: async(req: Request, res: Response) => {
        const { id, numero_ruta, correo_usuario, ...rest } = req.body;
        const { prisma } = server;

        try {
            
            const id_ruta = await prisma.ruta.findUnique({ where: { numero: numero_ruta } });
            if(!id_ruta) {
                return res.status(400).json({ msg: 'Numero de ruta no valido' });
            }

            const usuario = await prisma.usuario.findUnique({ where: { correo: correo_usuario } });

            rest.id_ruta = id_ruta.id;
            rest.nombre_chofer = capitalizar(usuario!.nombre);
            rest.apellidos_chofer = capitalizar(usuario!.apellidos);
            rest.id_usuario = usuario!.id;
            rest.numero_ruta = numero_ruta;

            const parada = await prisma.vehiculo.create({ data: rest });
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

            if(rest.correo_usuario) {
                const user = await prisma.usuario.findUnique({ where: { correo: rest.correo_usuario } });
                if(!user || user.rol !== 'CHOFER') {
                    return res.status(400).json({ msg: 'Chofer no valido' });
                }

                rest.nombre_chofer = user.nombre;
                rest.apellidos_chofer = user.apellidos;
                rest.id_usuario = user.id;
            }

            const vehiculo = await prisma.vehiculo.update({
                where: { numero: parseInt(id) },
                data: rest
            });

            res.status(200).json({ vehiculo });

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
            
            await prisma.vehiculo.delete({ where: { numero: parseInt(id) } });
            res.status(200).json({ msg: 'Vehiculo eliminado' });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                msg: 'Error de servidor'
            });
        }
    },
}

export default vehiculos;