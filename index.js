/* 
***** TIPOS DE ERRORES HTTP ****
STATUS ERROR 200: Significa que la página ha cargado de forma correcta.
STATUS ERROR 301 o 302: Estos códigos indican que se está haciendo una redirección de una página a otra.
STATUS ERROR 400: la solicitud tiene una sintaxis incorrecta. Significa que las dirección de la página web que se quiere cargar (la URL) tiene un formato no válido.
STATUS ERROR 403: indica que la página solicitada existe pero se ha denegado el acceso a la misma. Por ejemplo, podría tratarse de un contenido exclusivo para usuarios registrados.
STATUS ERROR 401: similar al error 403, pero en este caso existiría una posibilidad de acceso a la misma que no se ha pasado o todavía no se ha superado. Por ejemplo, al cargar la página se podría mostrar una solicitud de usuario y contraseña, que deben ser rellenados para poder acceder a la página.
STATUS ERROR 404: posiblemente el error más común. Indica que la página que se está tratando de cargar no se ha encontrado.
STATUS ERROR 406: indica que la página ha devuelto un código que no puede ser interpretado por el navegador con el que estamos cargando la página web.
STATUS ERROR 500: otro error muy común. Indica un error interno, lo que se puede traducir que la página web tiene algún error en el código, por lo que el servidor no puede generar el código HTML para devolver al usuario.
                  Crash del servidor
STATUS ERROR 504 gateway time-out: indica que el tiempo de espera para devolver la página web se ha agotado. Puede estar generado por un error en el propio servidor (por ejemplo, se ha “colgado” el Apache) o porque nuestra página web contiene algún código que nunca termina de ejecutarse (por ejemplo, un bucle del que nunca se sale).
STATUS ERROR 509: indica que se ha superado el límite de ancho de banda disponible en el servidor para nuestra página web.
*/

const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./db/config');
require('dotenv').config(); // llama al archivo .env para leer el contenido

// entra en el archivo .env
// asigno a una constante el puerto y lo pongo de parametro al puerto de escucha de la app
// app.listen(_PUERTO)
// const _PUERTO = process.env.PORT;



// Crear el servidor/aplicacion de express
const app = express();

// // Base de datos conection
dbConnection();

// // Directorio público con un middleware con .use
app.use( express.static('public'));

// CORS Middleware
app.use( cors() );

// Lectura y parseo del body. Otro Middleware
app.use( express.json() );

// Rutas y middleware (.use('path base', require('./ruta de los path de auth.js)))
app.use( '/api/auth', require('./routes/auth') );


// // para ver las variables de entorno .env que hayamos modificado hay que bajasr el 
// // servidor y volverlo a subir
app.listen( process.env.PORT , () => {
    console.log(`Servidor corriendo en el puerto ${ process.env.PORT }`);
});

