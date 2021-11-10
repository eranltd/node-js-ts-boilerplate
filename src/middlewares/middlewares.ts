const morgan = require('morgan');
const config = require('../config/config');
const myLogger = require('../logger');
var bodyParser = require('body-parser')
// import authenticate from "../Middlewares/jwt";
// import bodyParser from "body-parser";



export const loadAllMiddlewares = (app) => {
    
    /**setup morgan with winston */

    morgan.token('timestamp', (req, res: any) => `[${new Date().toISOString()}]`);

     app.use(morgan(':timestamp :method | :url | :status | :res[content-length] bytes :response-time ms', { stream: myLogger.console }))
    
     app.use(bodyParser.json({ limit: '5mb', type: 'application/json' }));
    // app.use(cors({ origin: process.env.CLIENT_URL }));

    // error handler
    app.use(function(err, req, res, next) {

        //TBD : refactor message format
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
    
        // add this line to include winston logging
        (res.statusCode >= 400)?
            myLogger.info(`${err.status || 500} - ${err.message.trim()} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
            :
            myLogger.error(`${err.status || 500} - ${err.message.trim()} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

        // render the error page
        res.status(err.status || 500);
        res.render('error');
  });


};
