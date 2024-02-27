// controllers
import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import bcryptjs from 'bcryptjs';

import { server } from "..";
import { capitalizar } from "../middlewares/capitalizar-nombre";

const usuarios = {
    listar: async(req: Request, res: Response) => {

        try {
            const { prisma } = server;
            const [ total, users ] = await Promise.all([
                prisma.usuario.count({ where: { estado: true } }),
                prisma.usuario.findMany({ where: { estado: true } })
            ]);
            
            res.status(200).json({
                total,
                users
            });

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
            
            const user = await prisma.usuario.findUnique({ where: { id } });
            res.status(200).json({
                user
            });

        } catch (error) {
            res.status(500).json({
                msg: 'Error de servidor'
            });            
        }

    },
    crear: async(req: Request, res: Response) => {
        const { id, estado, ...body } = req.body;

        try {

            const { prisma } = server;

            // Encriptar constraseña
            const salt = bcryptjs.genSaltSync(15);
            body.password = bcryptjs.hashSync(body.password, salt);

            body.foto = 'default_user.png';

            // /[a-z0-9-_.]+@[a-z]+(|.[a-z]{2,3}){1,2}/g
            if(!body.correo.includes('@')) {
                return res.status(400).json({
                    msg: 'Correo no valido'
                });
            }

            const user = await prisma.usuario.create({ data: body });

            res.status(200).json({ user })

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
        const token = req.header('api-key');
        const { estado, ...body } = req.body;
        const { prisma } = server;
        
        try {
            const aux = await prisma.usuario.findUnique({ where: { id } });

            if(body.password || body.password === '') {
                if(body.password.length < 1 || body.password === '' ) {
                    body.password = aux!.password;
                } else {
                    const salt = bcryptjs.genSaltSync(15);
                    body.password = bcryptjs.hashSync(body.password, salt);
                }
            }

            if(body.correo && body.correo !== aux!.correo) {
                const correo = await prisma.usuario.findUnique({ where: { correo: body.correo } });
                if(correo || !body.correo.includes('@')) {
                    return res.status(400).json({
                        msg: 'Correo no valido'
                    });
                }
            }

            if(body.telefono && body.telefono !== aux!.telefono) {
                const tel = await prisma.usuario.findUnique({ where: { telefono: body.telefono } });
                if(tel) {
                    return res.status(400).json({
                        msg: 'Telefono no valido'
                    });
                }
            }

            if(body.nombre){
                body.nombre = capitalizar(body.nombre);
            }

            const user = await prisma.usuario.update({
                where: { id },
                data: body
            }); 

            res.status(200).json({ user, token });

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
            
            await prisma.usuario.update({ 
                where: { id },
                data: { estado: false }
            });

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

export default usuarios;