import express from 'express';
import morgan from 'morgan';
/**
    - morgan hace un log de las peticiones HTTP
 */
//inicializando la app express
const app = express();

/**
 * import ROUTES
 */
import usersRoutes from './routes/users.routes.js'
import tasksRoutes from './routes/tasks.routes.js'


/**
 * MIDDLWARES
 */
app.use(morgan('dev'));

/**
 * Routes
 */
app.use('/api/users',usersRoutes);
app.use('/api/tasks',tasksRoutes);

//devolvemos la app inicializada
export default app;
