const connection = require('../database/connection');
const bcrypt = require('bcrypt');

module.exports = {
    async create(request,response){
    const {name,passwordOriginal} = request.body;

    console.log(name)
    console.log(passwordOriginal);
    const usernameSearch = await connection('companies').where('username',name).select('username');
    const passwordCryptSearch = await connection('companies').where('name',name).select('password').first();

    const passwordDeCrypt = bcrypt.compareSync(passwordOriginal,passwordCryptSearch);

    if(usernameSearch.name !== username && passwordOriginal !== passwordDeCrypt){
        return response.status(400).json({Resposta:'Usuário da empresa e/ou senha incorretos'});
    }
    return response.json({Resposta: passwordCryptoSearch.password});

    }

};