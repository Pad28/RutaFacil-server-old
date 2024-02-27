import path from "path";
import fileUpload from "express-fileupload";
import { v4 as uuidv4 } from 'uuid';

const subirArchivo = (files: fileUpload.FileArray, extencionesValidas: string[], carpeta: string) => {
    return new Promise((resolve, reject) => {
        
        const { archivo } = files;
        if(!Array.isArray(archivo)) {
            const nombreCortado = archivo.name.split('.');
            const extension = nombreCortado[nombreCortado.length - 1];

            // Validar extencion
            if(!extencionesValidas.includes(extension)) {
                return reject(`La extencion ${extension} no es valida, ingresa imagenes con extencion ${extencionesValidas}`);
            }

            const fileName = uuidv4() + '.' + extension;
            const uploadPath = path.resolve('uploads', carpeta, fileName);
            archivo.mv(uploadPath, err => {
                if(err) {
                    console.log(err);
                    return reject('Ocurrio un error al subir la imagen al servidor :(');
                }

                resolve(fileName)
            });
            
        } else {
            reject('Demasiados archivos');
        }

    });
}

export default subirArchivo;