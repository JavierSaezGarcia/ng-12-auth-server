

const jwt = require('jsonwebtoken')

const generarJWT = ( uid, name ) => {
    
    // pide el payload, el 
    // secretOrProvateKey( debe ser uy secreta y hay que tener cuidado)
    // despues el timepo que queremos que actue

    const payload = { uid, name };

    return new Promise( ( resolve,reject) => {

        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '24h'
        }, (err, token) => {

                if ( err ) {
                    // TODO MAL
                    console.log(err);
                    reject(err);
                } else {
                    // TODO BIEN
                    resolve( token )
                }
        });
    });

}

module.exports = {
    generarJWT
}