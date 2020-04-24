const connection = require('../database/connection');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const axios = require('axios');

function hash(password){
    const saltRounds = 15;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

module.exports = {
   async index(request,response){
        const companies = await connection('companies').select('name','email');
        const [count] = await connection('companies').count();

        response.header('Total-Companies-Count',count['count']);

        return response.json(companies);
    },

    async create(request,response){
        const {name, email, passwordInput, cnpj} = request.body;
        const id = crypto.randomBytes(5).toString("HEX");
        const password = hash(passwordInput);
        const dataIp = await axios.get('http://ip-api.com/json');
        const country = dataIp.data.country;
        const city = dataIp.data.city;
        const region = dataIp.data.region;
        const latitude = dataIp.data.lat;
        const longitude = dataIp.data.lon;
        await connection('companies').insert({
            id,
            cnpj,
            name,
            email,
            password,
            country,
            city,
            region,
            latitude,
            longitude
        });

        return response.json("Companhia cadastrada com sucesso");

    },
    
    async delete(request, response){
        const companie_id = request.headers.authorization;
        const passwordInput = request.body;

        const companieIdBD = await connection('companies').where('id', companie_id)
        .select('id').first();

        if(!companieIdBDd){
            return response.status(401).json({error: 'Operação não permitida'});
        }

        const passwordDB = await connection('users').where('id', companie_id)
        .select('password').first();
        const companieMatch = bcrypt.compareSync(passwordInput, passwordDB.password);
        
        if (!companieMatch) {
            return response.status(401).json({error: 'Senha Inválida'});
        }

        await connection('companies').where('id', companie_id).delete();
        return response.send();
    }
};