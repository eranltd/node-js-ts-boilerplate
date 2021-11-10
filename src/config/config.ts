import * as dotenv from 'dotenv'
import * as path from 'path'
import * as fs from 'fs'

const rootFolder = path.resolve()

const environments = {
    development: 'development',
    test: 'test',
    prod: 'production',
    staging: 'staging',
}

const NODE_ENV = process.env.NODE_ENV;

function loadEnvironments() {

    /**check for the right env file */

    const defaultFilePath = path.join(rootFolder, `.env`)
    const envFilePath = path.join(rootFolder, `.env.${NODE_ENV}`)

    if(environments[NODE_ENV] != undefined){
        console.log(`Searching for ${NODE_ENV} file,${envFilePath}`);
        if (fs.existsSync(envFilePath)) {
            console.log(`[config] [loadEnvironments] loading: ${envFilePath}`)
            dotenv.config({ path: envFilePath })
        }
    }
    else if(fs.existsSync(defaultFilePath)){
        //     //try take .env
        console.log(`[config] [loadEnvironments] loading: ${defaultFilePath}`)
        dotenv.config({ path: envFilePath })
    }
    else{
        console.info(`[config] [loadEnvironments] could not load any .env config including .env.${Object.keys(environments).join(' | ')}`)

    }

    //tell the user, do not load.

    dotenv.config()
}

function loadConfig() {
    const port = parseInt(process.env.PORT) || 8082
    const client_build_path = 'client/build'

    return {
        port,
        client_build_path,
    }
}

loadEnvironments();
const config = loadConfig();

export default config;