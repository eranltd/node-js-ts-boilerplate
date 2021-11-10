
import {readdirSync} from 'fs';
import pathResolver from 'path';
const myLogger = require('../logger');
// const mongoose = require('mongoose');
// const axios = require('axios').default;

export const loadAllControllers = (app) => {
    const source = pathResolver.resolve(__dirname,'./');
    const controllers = readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    const IsExternalAPIReady = async () => {
        // let externalURL = process.env.EXTERNAL_SERVICE_VALIDATION_URL;
        // let response = await axios.post(externalURL, {"testing_api":true}); //return promise from that call.
        // return Boolean(response.data.success);
    }

    controllers.forEach(controllerName => {
        const controller = require(`../controllers/${controllerName}/${controllerName}`)
        myLogger.info(`Registering ${controllerName} Controller`);
        app.use(`/${controllerName}`, controller.default);
    });

    app.get('/',function(req, res){
        controllers.forEach(controllerName => {
            let result = "Application Endpoints :<br/>"
            result += `/${controllerName}<br/>`;
            res.send(result);
        })});




    /**
     * K8s - check status of the our Micro - Service
     */
    app.get("/health", async (req, res) => {
        /**Connection ready state
         0 = disconnected
         1 = connected
         2 = connecting
         3 = disconnecting
         */

        // let isMongoReady = mongoose.connection.readyState == 1;
        // let isRulesEngineReady = await IsRulesEngineReady();
        //
        // isMongoReady && isRulesEngineReady? res.status(200): res.status(500);
        res.json({"isMongoReady":true,"isExternalReady":true})
    });

}