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
import authRouters from './routes/auth.routes.js'
import { authenticateToken } from './middlewares/authenticate.middleware.js';


/**
 * MIDDLWARES
 */
app.use(morgan('dev'));
app.use(express.json()); // esta linea parsea el json enviado en el cuerpo de una peticion

/**
 * Routes
 */
app.use('/api/users',usersRoutes);
app.use('/api/tasks', authenticateToken ,tasksRoutes);  // agregando authenticateToken precio a las rutas de interes, se logra PROTEGER con el MIDDLEWARE a todas las rutas hijas
app.use('/api/login',authRouters);

//devolvemos la app inicializada
export default app;
