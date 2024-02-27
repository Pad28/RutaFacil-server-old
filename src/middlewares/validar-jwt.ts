import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

import { server } from "..";
import { JwtPayload } from "../interfaces";

const validarJWT = async(req: Request, res: Response, next: NextFunction) => {
    const token = req.header('api-key');
    const { usuario } = server.prisma;

    if(!token) {
        return res.status(401).json({ msg: 'No autorizado' });
    }

    try {
        
        const { id }: JwtPayload = jwt.verify(token, process.env.SECRETORPRIVATEKEY || '') as JwtPayload;
        const user = await usuario.findUnique({ where: { id } });

        if(!user) {
            return res.status(401).json({ msg: 'No autorizado' });
        }

        if(!user.estado) {
            return res.status(401).json({ msg: 'No autorizado' });
        }

        req.authenticatedUser = user;
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({ msg: 'Token no valido' });
    }
}

export {
    validarJWT
}