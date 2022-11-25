

const jwt = require('jsonwebtoken')

const generarJWT = ( uid, name ) => {
    
    // pide el payload, el 
    // secretOrProvateKey( debe ser uid secreta y hay que tener cuidado)
    // despues el timepo que queremos que actue

    // *******************
    // 1- Pide el payload : uid y name
    // 2- Pide la clave secreta SECRET_JWT_SEED
    // 3- Hay que indicarle el tiempo de expiracion

    const payload = { uid, name };

    return new Promise( ( resolve, reject ) => {

        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '24h'
        }, (err, token) => {

                if ( err ) {
                    // TODO MAL
                    console.log('No se pudo generar el jwtoken', err);
                    reject(err);
                } else {
                    // TODO BIEN
                    console.log('El token se ha generado correctamente',token);
                    resolve( token )
                }
        });
    });

}

module.exports = {
    generarJWT
}