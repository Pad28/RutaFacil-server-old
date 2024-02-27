import { Request, Response } from "express";
import bcryptjs from 'bcryptjs';
import { server } from "..";
import { generarUserJWT } from "../helpers";

const auth = {
    userLogin: async(req: Request, res: Response) => {
        const { usuario, password } = req.body;
        const { prisma } = server;

        try {
            
            const user = await prisma.usuario.findFirst({
                where: {
                    OR: [ { correo: usuario }, { telefono: usuario }, ]
                }
            });

            if(!user) {
                return res.status(400).json({ msg: 'El usuario o contraseña no es valido' });
            }

            if(!user.estado) {
                return res.status(400).json({ msg: 'El usuario o contraseña no es valido' });
            }

            const validPassword = bcryptjs.compareSync(password, user.password);
            if(!validPassword) {
                return res.status(400).json({ msg: 'El usuario o contraseña no es valido' });
            }

            const token =  await generarUserJWT(user.id);

            res.status(200).json({ user, token });

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                msg: 'Error del servidor'
            });  
        }

    },
    validarToken: async(req: Request, res: Response) => {
        const token = req.header('api-key');
        const { authenticatedUser } = req;
        res.status(200).json({ user: authenticatedUser, token });
    }
}

export default auth;