
import express from 'express'
var path = require("path");

var myLogger = require('../../logger');

const router = express.Router();


/** Endpoint : http://localhost:<port>/sample */
router.get('/', (req, res) => {
  myLogger.info("written from sample controller");
    // res.send('Hello World!');
    res.sendFile(path.resolve('/sample.html'), { root: './src/views' });
  })

  
// router.post('/',validator, checkValidationResult, async (req, res) => {
//     const {
//         accountSid,
//         authToken,
//         from,
//         to
//     } = req.body;
//     const result = await getRepository(Tenant).findOne({where: {name: Like('%11342%')}});
//     res.send('passed '+JSON.stringify(result));
// })

export default router;