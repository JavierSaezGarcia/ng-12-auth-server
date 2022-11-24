

const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken  } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// Crear un nuevo usuario: primero el path, segundo los middlewares y tercero el controlador de esta ruta
// En caso de solo haber el path y otro elemento sera el controlador
// Un middleware es una funcion normal y corriente
router.post('/new', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria y tiene que tener 6 caracteres').isLength({min: 6}),
    validarCampos
] ,crearUsuario );
// Observamos que en validarCampos anterior no estoy llamando a ejecutar la funcion que sería asi validarCampos() sino apuntanbdo a la referencia

// Crear Login de usuario con arreglo de middlewares
router.post('/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria y tiene que tener 6 caracteres').isLength({min: 6}),
    validarCampos
], loginUsuario );

// validar y revalidar token
router.get('/renew', validarJWT, revalidarToken );

// Es la forma de externalizar modulos en Node similar a export class en angular
module.exports = router


