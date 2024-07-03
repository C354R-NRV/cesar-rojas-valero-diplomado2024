import { User } from '../models/user.js';
import logger from '../logs/logger.js';
import { Status } from '../constants/index.js';

async function getUsers(req, res) {
    try {
        const users = await User.findAll({
            attributes: ['id','username', 'password', 'status'],
            order: [['id','DESC']],
            where: {
                status: Status.ACTIVE,
            }
        });
        res.json(users);
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({
            message: error.message
        });     
    }
}
async function createUsers(req, res) {
    const { username, password } = req.body;
    try {
        logger.info('[userController] createUser:' + username);
        const user = await User.create({ username, password });
        return res.json(user);
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({
            message: error.message
        });
    }
    /** body de ejemplo de envio POST
        {
            "username": "crojas",
            "password": "123"
        }
     */ 

}

async function getUser(req, res) {
    const { id } = req.params;
    try {
        const user = await User.findOne({
            attributes: ['username', 'status'],
            where: {id },
        });
        if(!user) return res.status(404).json({message: 'Usuario no encontrado'});
        res.json(user);
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({
            message: error.message
        });
    }
}

export default {
    getUsers,
    createUsers,
    getUser
}