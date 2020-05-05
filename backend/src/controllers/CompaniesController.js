const connection = require('../database/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const crypto = require('crypto');
const axios = require('axios');
    
function hash(password){
    const saltRounds = 12;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

function generateToken(params = {}){
	return jwt.sign(params, authConfig.secret,{
		expiresIn:86400,
	});
}

module.exports = {
   async index(request,response){
        const companies = await connection('companies').select('name','email');
        const [count] = await connection('companies').count();

        response.header('Total-Companies-Count',count['count']);

        return response.json(companies);
    },

    async create(request,response){
        const { 
              cnpj, 
              passwordInput, 
              collector,
              country,
              city,
              region,
              latitude,
              longitude } = request.body;

        const id = crypto.randomBytes(5).toString("HEX");
        const password = hash(passwordInput);
        const dataCNPJ = await axios.get(`https://www.receitaws.com.br/v1/cnpj/${cnpj}`);
        
        if (dataCNPJ.data.status == "ERROR") {
            return response.status(400).json({error: dataCNPJ.data.message});
        }

        const name = dataCNPJ.data.nome;
        const email = dataCNPJ.data.email;
        const activity = dataCNPJ.data.atividade_principal[0].text;
        const phone = dataCNPJ.data.telefone;
        const neightborhood = dataCNPJ.data.bairro;
        
        await connection('companies').insert({
            id,
            cnpj,
            name,
            email,
            password,
            activity,
            collector,
            country,
            city,
            region,
            neightborhood,
            phone,
            latitude, 
            longitude
        });

        return response.json({
        sucess: "Companhia cadastrada com sucesso",
        token: generateToken({id: id})
    });
    
    },
    
    async delete(request, response){
        const companie_id = request.headers.authorization;
        const { passwordInput } = request.body;

        
        const companieIdBD = await connection('companies').where('id', companie_id)
        .select('id').first();

        if(!companieIdBD){
            return response.status(401).json({error: 'Operação não permitida'});
        }

        const passwordDB = await connection('companies').where('id', companie_id)
        .select('password').first();
        const companieMatch = bcrypt.compareSync(passwordInput, passwordDB.password);
        
        if (!companieMatch) {
            return response.status(401).json({error: 'Senha Inválida'});
        }

        await connection('companies').where('id', companie_id).delete();
        return response.send();
    }
        
};
    
