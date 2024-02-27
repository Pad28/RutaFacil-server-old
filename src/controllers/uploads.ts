// Controllers
import path from 'path';
import fs from 'fs';
import { Request, Response } from "express";
import { limpiarImg, subirArchivo } from "../helpers";
import { server } from "..";

const uploads = {
    cargarArchivo: async(req: Request, res: Response) => {
        const { id } = req.params;
        const { prisma } = server;

        if(!req.files || Object.keys(req.files).length === 0 || !req.files.archivo){
            res.status(400).json({ msg: 'No hay archivos que subir' });
            return;
        }

        try {
            const nombreArchivo = await subirArchivo(req.files, ['png', 'jpg', 'jpeg'], 'usuarios') as string;
            const user = await prisma.usuario.findUnique({ where: { id } });
            limpiarImg(user!.foto!);

            await prisma.usuario.update({ where: { id }, data: { foto: nombreArchivo } });

            // res.status(200).sendFile(path.resolve('uploads/usuarios/' + nombreArchivo));
            res.status(200).json({ nombreArchivo });
        } catch (error) {
            res.status(400).json({ error });
        }
    },
    verFotoUsuario: async(req: Request, res: Response) => {
        const { id } = req.params;
        const { prisma } = server;

        try {
            
            const user = await prisma.usuario.findUnique({ where: { id }});
            let img: string;
            if(user!.foto !== 'default_user.png') {
                img = path.resolve(`uploads/usuarios/${user?.foto}`);
                if(!fs.existsSync(img)) {
                    return res.status(401).json({ msg: `No existe la imagen ${img}` });
                }
                return res.status(200).sendFile(img);                
            } 
            
            img = path.resolve(`assets/default_user.png`);
            res.status(200).sendFile(img);
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: 'Error de servidor' });
        }
    },
}

export default uploads;