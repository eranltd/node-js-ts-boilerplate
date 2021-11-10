import express from "express";

/*Application config */
import envConfig from './config/config';

const myLogger = require('./logger');

/**Init Controllers */
import {loadAllControllers} from './controllers/controllers';

/**Init Middlewares */
import {loadAllMiddlewares} from './middlewares/middlewares';

/*Init Services  */

import {loadAllServices} from './services/services';

const app = express();

export async function main() {
    app.listen(envConfig.port, () => {
        console.log('[main]', 'API is running on port', envConfig.port)
    })

     await loadAllMiddlewares(app); /*JWT, morgan, ... */
     await loadAllControllers(app); 
     await loadAllServices(app); /*MongoDB, customService, Singleton, ... */

    if (process.env.NODE_ENV === 'production') {
        console.log('[server]', 'static serve of:', envConfig.client_build_path)
        app.use('/*', express.static(envConfig.client_build_path))
    }

    /*`log level*/
    myLogger.log('error',`LOG_LEVEL : [${process.env.LOG_LEVEL}]`);

    /* Testing LogLevelBY ENV Variable */
    myLogger.log('silly', "127.0.0.1 - there's no place like home");
    myLogger.log('debug', "127.0.0.1 - there's no place like home");
    myLogger.log('verbose', "127.0.0.1 - there's no place like home");
    myLogger.log('info', "127.0.0.1 - there's no place like home");
    myLogger.log('warn', "127.0.0.1 - there's no place like home");
    myLogger.log('error', "127.0.0.1 - there's no place like home");

    myLogger.info("works");

    return "Server has been initialized successfully"
}

main()
    .then(console.log)
    .catch(console.error)