import { NextFunction, Request, Response } from "express";

const capitalizar = (cadena: string): string => {
    const array: string[] = cadena.split(' ');
    array.forEach((str, i) => {
        str = str.toLowerCase();
        if(str.length === 0) {
            return;
        }
        const primerCaracter = str[0].toUpperCase();
        const restocadena = str.slice(1);
        array[i] = primerCaracter + restocadena;
    });

    return array.join(' ');
}

const capitalizarNombre = (req: Request, res: Response, next: NextFunction) => {
    const { nombre, apellidos } = req.body;

    req.body.nombre = capitalizar(nombre);

    if(apellidos){
        req.body.apellidos = capitalizar(apellidos);
    }

    next();
}

export {
    capitalizar,
    capitalizarNombre,
};