import jwt from 'jsonwebtoken';
import 'dotenv/config';

export function authenticateToken(req, res, next) {
    //obtenemos el token de la cabecera de autorizacion
    const authHeader = req.headers['authorization'];
    // authHeader -> llega con la cadena: Bearer ......
    const token = authHeader && authHeader.split(' ')[1];
    if (token === null) return sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);

        console.log('user', user);
        req.user = user;
        next();

    });
}