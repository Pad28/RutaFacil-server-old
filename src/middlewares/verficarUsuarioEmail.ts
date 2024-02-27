import { NextFunction, Request, Response } from "express";
import { server } from "..";

const validarUsuarioEmail = async(req: Request, res: Response, next: NextFunction) => {
    const { correo_usuario } = req.body;
    const { prisma } = server;

    try {

        const user = await prisma.usuario.findUnique({ where: { correo: correo_usuario } });
        if(!user) {
            return res.status(400).json({
                msg: 'No existe un usuario con el correo ' + correo_usuario
            });
        }

        req.body.id_usuario = user.id;
        next();

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error de servidor' })
    }

}

export default validarUsuarioEmail;