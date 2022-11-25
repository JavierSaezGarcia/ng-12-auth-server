

const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { validationResult } = require('express-validator');


// Create user
const crearUsuario = async( req, res = response ) => {         
    const { email, name, password } = req.body;

    try {   
        // VERIFICAR EL EMAIL
        const usuario = await Usuario.findOne({ email });
        // Evaluar la sentencia anterior
        // Verificamos:
        if( usuario ) {
            return res.status(400).json({
                ok:false,
                msg: 'El usuario ya existe con este email'
            });
        }
        // Una vez que ya hemos verificado que no existe el usuario vamos a crearlo
        // Crear usuario con este modelo
        const dbUser = new Usuario( req.body );

        // ENCRIPTAR LA CONTRASEÑA "Hashear"
        // generamos letras y numeros aleatorios con salt sync
        const salt = bcrypt.genSaltSync(); 
        // el numero son las vueltas 
        // que da generando por defecto son 10 si no pones nada entre parentesis
        // Hacemos el hash con hasSync del password
        dbUser.password = bcrypt.hashSync( password, salt );

        // Generar el Json Web Token JWT
        const token = await generarJWT(dbUser.id, name);        

        // Crear usuario de DB
        await dbUser.save();

        // Generar respuesta exitosa
        // Status 201 es que se creo un  nuevo registro
        return res.status(201).json({
            ok: true, 
            uid: dbUser.id,
            name,
            token
        });    

    } catch (error) {
        return res.status(500).json({
                ok: false,
                msg: 'Por favor hable con el administrdor, status 500'    
            });
    
    }
}
const loginUsuario = async(req, res = response) => {

    const { email, password } = req.body;     
    try {
        const dbUser = await Usuario.findOne({ email });
        // Si no es valido el nombre de usuario de la BD
        if ( !dbUser ) {
            return res.status(400).json({
                ok: false,
                msg: "El correo no existe"
            });
        }
        // Confirmar si el password introducido hace match con el password de la BD
        const validPassword = bcrypt.compareSync( password, dbUser.password);
        // Si no es valida la contraseña con la de la BD
        if ( !validPassword ) {
            return res.status(500).json({
                ok: false,
                msg: "El password no es válido"
            });
        }        
        // Generar el Json Web Token JWT
        const token = await generarJWT(dbUser.id, dbUser.name);

        // Respuesta del servicio si todo esta OK
        return res.json({
            ok: true,
            uid: dbUser.id,
            name: dbUser.name,
            msg: 'todo es correcto',
            token

        })

    } catch (error) {
        console.log(error); 
        return res.status(500).json({
        ok: false,
        msg: "Hable con el administrador"
       })
    }
        
}

const revalidarToken = async(req, res = response) => {

    const { uid, name } = req;
    
    // Generar el JWT
    const token = await generarJWT( uid, name );
    
    return res.json({
        ok: true,
        uid, name,
        token
    });
}
module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}