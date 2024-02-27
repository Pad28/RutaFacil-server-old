import { NextFunction, Request, Response } from "express"

const validarRol = ( ...roles: string[] ) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if(!req.authenticatedUser) {
            return res.status(400).json({ msg: 'Se requiere verificar el token primero' });
        }

        if(!roles.includes( req.authenticatedUser.rol )) {
            return res.status(400).json({ msg: 'Se requiere uno de los siquietes roles: ' + roles });
        }

        next();
    }
} 

export {
    validarRol
}