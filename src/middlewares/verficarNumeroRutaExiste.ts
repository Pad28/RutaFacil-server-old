import { NextFunction, Request, Response } from "express";
import { server } from "..";

const verficarNumeroRutaExiste = async(req: Request, res: Response, next: NextFunction) => {
    const { numero_ruta } = req.body;
    const { prisma } = server;

    try {
        
        const ruta = await prisma.ruta.findUnique({ where: { numero: numero_ruta } });
        if(!ruta) {
            return res.status(400).json({ 
                msg: 'El numero de ruta no es valido' 
            });
        }

        req.body.id_ruta = ruta.id;
        next();

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error de servidor' })
    }
}

export default verficarNumeroRutaExiste;