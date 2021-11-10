const myLogger = require("../../logger");

export const batchProcessor = async () => {
    let seconds = 10 * 1000;

    /* Wrap main code in an async IIFE so we can use await.*/
    await (async function execute() {

        myLogger.info(`Processing X in Queue - START`);

        /*Write your code here*/



        myLogger.info(`Processing Notifications in X - DONE`);
        setTimeout(execute, seconds);
    })();
};