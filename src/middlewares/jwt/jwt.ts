// import jwt from 'jsonwebtoken';

// export default (req, res, next) =>{
//     let accessToken = req.headers.authorization;
//     if (!accessToken){
//         return res.status(403).send()
//     }
//     let payload
//     try{
//         //use the jwt.verify method to verify the access token
//         //throws an error if the token has expired or has a invalid signature
//         accessToken = accessToken.replace("Bearer ", "");
//         const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
//         res.locals.serviceName = decoded.serviceName;
//         next()
//     }
//     catch(e){
//         //if an error occurred return request unauthorized error
//         return res.status(401).send('invalid token')
//     }
// }