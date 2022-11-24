

const { response } = require('express');
const { validationResult } = require('express-validator');
// Un middleware no es más que una simple función que recibe como argumentos la request la response lo que o
// ustedes quieren responder al usuario o al que está haciendo la petición y el next, que es la única diferencia
// con un controlador

const validarCampos = (req, res = response, next ) => {

    const errors = validationResult( req );
    if(!errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }

    next();
        
    
}

// exportamos
module.exports = {
    validarCampos
}