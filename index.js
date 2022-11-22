const express = require('express');
const cors = require('cors');
require('dotenv').config();

// entra en el archivo .env
// console.log( process.env );
// asigno a una constante el puerto y lo pongo de parametro al puerto de escucha de la app
// app.listen(_PUERTO)
const _PUERTO = process.env.PORT;

// Crear el servidor/aplicacion de express
const app = express();

// Directorio público con un middleware con .use
app.use( express.static('public'));

// CORS Middleware
app.use( cors() );

// Lectura y parseo del body. Otro Middleware
app.use( express.json() );

// Rutas y middleware (.use('path base', require('./ruta de los path de auth.js)))
app.use( '/api/auth', require('./routes/auth') );


// para ver las variables de entorno .env que hayamos modificado hay que bajasr el 
// servidor y volverlo a subir
app.listen( _PUERTO , () => {
    console.log(`Servidor corriendo en el puerto ${ 4000 }`);
});