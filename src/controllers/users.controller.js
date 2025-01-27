import { User } from '../models/user.js';
import logger from '../logs/logger.js';
import { Status } from '../constants/index.js';
import { Task } from '../models/task.js';
import { encriptar } from '../common/bycript.js';

async function getUsers(req, res) {
    try {
        const users = await User.findAll({
            attributes: ['id', 'username', 'password', 'status'],
            order: [['id', 'DESC']],
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
            where: { id },
        });
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json(user);
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({
            message: error.message
        });
    }
}

//forma no recomendable pero funcional
const updateUser = async (req, res) => {
    console.log("============================================================ UPDATE USER =================================");
    const { id } = req.params;
    const { username, password } = req.body;
    try {
        if (!username || !password)
            return res.status(400).json({ message: 'Ingrese usuario y contraseña' });
        var passwordEncriptado = await encriptar(password);

        const user = await User.update(
            {
                username,
                password: passwordEncriptado
            },
            {
                where: { id }
            }
        );
        res.json(user);
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({
            message: error.message
        });
    }
};

const activateInactive = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        if (!status) return res.status(400).json({ message: 'No existe el estatus' });

        const user = await User.findByPk(id);

        if (user.status === status) return res.status(409).json({ message: `El usuario ya se encuentra ${status}` });

        user.status = status;
        await user.save();
        res.json(user);
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({
            message: error.message
        });
    }
};

//no es recomendable realizar el borrado fisico de registros
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await User.destroy({ where: { id: id } });
        return res.sendStatus(204);
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({
            message: error.message
        });
    }
};
async function getTasks(req, res) {
    const { id } = req.params;
    try {
        const user = await User.findOne({
            attributes: ['username'],
            where: { id },
            include: [
                {
                    model: Task,
                    attributes: ['name', 'done'],
                    /* where: { done : true}, */
                }
            ],
        });
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
    getUser,
    updateUser,
    activateInactive,
    deleteUser,
    getTasks
}