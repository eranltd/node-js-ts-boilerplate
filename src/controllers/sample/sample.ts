
import express from 'express'
var winston = require('../../config/winston');

const router = express.Router();


/** Endpoint : http://localhost:<port>/sample */
router.get('/', (req, res) => {
  winston.info("written from sample controller");
    res.send('Hello World!')
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