import logger from "../logs/logger.js";
import bcrypt from 'bcrypt';
import 'dotenv/config'

export const encriptar = async (text) =>{
    try {
        const saltRounds = +process.env.SALT_ROUNDS; //con el simbolo + , estamos casteando a entero
        return await bcrypt.hash(text, saltRounds);
    } catch (error) {
        logger.error(error.message);
        throw new Error('Error al encriptar'); // respuesta de cara al cliente
    }
};

export const comparar = async (text,hash)=>{
    try {
        return await bcrypt.compare(text, hash);
    } catch (error) {
        logger.error(error.message);
        throw new Error('Error al encriptar'); 
    }
}