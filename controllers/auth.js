const { response } = require('express');

// Create user
const crearUsuario = (req, res = response ) => {   
    
   
    const { email, name, password } = req.body;
    return res.json({
        ok: true,
        msg: 'Crear usuario /new'    
    })
}



const loginUsuario = (req, res = response) => {

    const { email, password } = req.body;
    console.log(email, password);
    
    return res.json({
        ok: true,
        msg: 'Crear login de usuario /'    
    })
}
const revalidarToken = (req, res = response) => {
    return res.json({
        ok: true,
        msg: 'Renew'    
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}