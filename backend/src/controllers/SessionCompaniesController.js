const connection = require('../database/connection');
const bcrypt = require('bcrypt');

module.exports = {
    async create(request,response){
        const {name, passwordInput} = request.body;
        const usernameSearch = await connection('companies').where('username', name).select('username').first();
        const passwordCryptSearch = await connection('companies').where('name', name).select('password').first();
        const passwordDeCrypt = bcrypt.compareSync(passwordInput, passwordCryptSearch.password);
    
        if(usernameSearch.name !== username && passwordInput !== passwordDeCrypt.password){
            return response.status(400).json({Resposta:'Usuário da empresa e/ou senha incorretos'});
        }
        return response.json({companie: name});

    }

};