const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');


module.exports = (request,response,next) => {

    const authHeader = request.headers.authentication;

    if(!authHeader)
        return response.status(401).json({error:'Token de autorização não informado!'});

    const parts = authHeader.split(' ');

    if(!parts.length === 2)
        return response.status(401).json({error: 'Error de token.'});


    const [scheme, token] = parts;

    if(!/^Bearer$/i.test(scheme))
        return response.status(401).json({error: 'Token mau formatado!'});
    
    jwt.verify(token, authConfig.secret, (err, decoded ) => {
        if(err) return response.status(401).josn({error: 'Token Inválido'});

        request.userId = decoded.id;
        return next();
    });
    

}