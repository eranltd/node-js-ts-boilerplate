/**at our company we are using cloud based logging, meaning we are writing everything to stdout
 * you can use process.env.LOG_LEVEL variable to decide which logs will be excluded.
*/

//https://blog.logrocket.com/node-js-logging-best-practices/
// https://www.npmjs.com/package/winston
//winston
//morgan

//... */

const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format; //TODO: remove label


const logLevels = { "OFF":{enumValue:-1,winstonAlias:""},
                    "ERROR":{enumValue:0,winstonAlias:"error"},
                    "WARN":{enumValue:1,winstonAlias:"warn"},
                    "INFO":{enumValue:2,winstonAlias:"info"},
                    "HTTP":{enumValue:3,winstonAlias:"http"},
                    "VERBOSE":{enumValue:4,winstonAlias:"verbose"},
                    "DEBUG":{enumValue:5,winstonAlias:"debug"},
                    "ALL":{enumValue:6,winstonAlias:"silly"},
};

//ALL - everyone bigger than 0
//WARN - everyone bigger than 1
//INFO - everyone bigger than 2
/*...*/
//OFF - no one

const myFormat = printf(({ level, message, timestamp }) => {
    return `[${timestamp}] ${level}: ${message}`;
});

const enumerateErrorFormat = format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const loggerLevel = logLevels[process.env.LOG_LEVEL] ?? logLevels["ALL"];

const Logger = createLogger({
   level: loggerLevel.winstonAlias,
  format: format.combine(
    process.env.NODE_ENV === 'development' ? format.colorize() : format.uncolorize(),
    format.splat(),

  ),
  transports: [
      new transports.Console({
          level: loggerLevel.winstonAlias,
          format:
          format.combine( format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),myFormat)
      })
  ],
});

if(process.env.LOG_LEVEL == 'OFF' ){
    Logger.transports.forEach((t) => (t.silent = true)); //Silence all logs levels and open only the ones specify in .env file
}

module.exports = Logger;
