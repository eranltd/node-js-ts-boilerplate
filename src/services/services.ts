// import mongoose from 'mongoose';
require('dotenv').config();
import {batchProcessor} from './dummy-service/dummy-service'
const myLogger = require('../logger')

//
// async function initMongoDB(){
//     const mongoDBUri = `${process.env.DB_MONGO_CLOUD_URL}`;
//
//     // db
//     //TODO: remove the const keep the connection
//     const mongoInstance = await mongoose.connect(mongoDBUri , {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useCreateIndex: true,
//         useFindAndModify: false,
//         poolSize : 5
//     });
//
//     mongoose.connection.on('connected', function(){
//         winston.info(`Mongoose default connection is open at : [${mongoDBUri}]`);
//     });
//
//     mongoose.connection.on('error', function(err){
//         winston.error(`Mongoose default connection has occurred  : ${err.message}`);
//     });
//
//     mongoose.connection.on('disconnected', function(){
//         winston.info(`Mongoose default connection is disconnected`);
//     });
// }

export const loadAllServices = async (app) => {
    //await initMongoDB();
    batchProcessor();
}

