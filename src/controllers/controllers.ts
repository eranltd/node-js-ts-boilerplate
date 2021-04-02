
import {readdirSync} from 'fs';
import pathResolver from 'path';

export const loadAllControllers = (app) => {
    const source = pathResolver.resolve(__dirname,'./');
    const controllers = readdirSync(source, { withFileTypes: true })
                                .filter(dirent => dirent.isDirectory())
                                .map(dirent => dirent.name);


    controllers.forEach(controllerName => {
        const controller = require(`../controllers/${controllerName}/${controllerName}`)
        console.log(`Registering ${controllerName} Controller`);
        app.use(`/${controllerName}`, controller.default);
    });

    app.get('/',function(req, res){
        controllers.forEach(controllerName => {
                let result = "Application Endpoints :<br/>"
                result += `/${controllerName}<br/>`;
                res.send(result);
        })});
    

}