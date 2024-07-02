import pino from 'pino';


//revisar translateTime:'SYS:dd-mm-yyyy HH:mm:ss' no esta funcioanndo 
const logger = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            translateTime: 'SYS:dd-mm-yyyy HH:mm:ss'
        },
    },
});

export default logger;
