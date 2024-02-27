import fs from 'fs';
import path from 'path';

const limpiarImg = (nombreImg: string) => {
    try {
        if(!fs.existsSync(path.resolve(`uploads/usuarios/${nombreImg}`))) {
            return;
        }

        fs.unlinkSync(path.resolve(`uploads/usuarios`) + `/${nombreImg}`);
    } catch (error) {
        console.log(error);
    }
}

export default limpiarImg;