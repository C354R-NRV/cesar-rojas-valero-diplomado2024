// index.js
//en package.json agregar ->>> "type":"module", // con esto logra funcionar las imporataciones
import app from './app.js'; //-->> es obligatorio poner la extension del archivo siempre
import 'dotenv/config'; //para establecer el puerto con variables de entorno, se utilizara DOTENV
import logger from './logs/logger.js';
import { sequelize } from './database/database.js';
/*
-instalamos nodemon, el cual es un npm que permite actualizar el servidor automaticamente, apenas se modifica algo en index.js o algun archivo dentro del proyecto
-tambien podemos agregar estas instrucciones en package.json, en la seccion   "scripts", el cual ejecuta comandos, en este caso:
    "dev": "nodemon src/index.js", -> ejecuta el nodemon /src/index.js cuando se ejecuta en consola >npm run dev  (ambiente de desarrollo)
    "start": "node src/index.js" esto se ejecuta en terminal con -> >npm run start  (ambiente de produccion)
-ahora usamos el pino-pretty para poder gestionar los logs, aca lo importamos desde logger.js

*/

async function main(){
    //iniciar el sequelize, con la opcion force: true, obligamos al ORM a borrar las tablas existentes y crear nuevamente segun lo que se tiene modelado, con false, ya deja de reiniciar la base de datos
    await sequelize.sync({force: false});   

    const port = process.env.PORT
    app.listen(port);
    logger.info(`Escuchando en puerto ${port}`);
}

main();
