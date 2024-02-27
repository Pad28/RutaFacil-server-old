import jwt from 'jsonwebtoken';

const generarUserJWT = (id: string) => {
    return new Promise((resolve, reject) => {
        
        const payload = { id };
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY || '', {
            expiresIn: '4h'
        }, (err, token) => {
            if(err) {
                console.log(err);
                reject('No se pudo generar el token');
            }
            resolve(token);
        })

    });
}

export  {
    generarUserJWT
}