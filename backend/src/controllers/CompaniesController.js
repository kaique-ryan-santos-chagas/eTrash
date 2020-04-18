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
        const {name,email,passwordOriginal} = request.body;

        const id = crypto.randomBytes(5).toString("HEX");

        const password = hash(passwordOriginal);

        const dataIp = await axios.get('http://ip-api.com/json');
        const country = dataIp.data.country;
        const city = dataIp.data.city;
        const region = dataIp.data.region;
        const latitude = dataIp.data.lat;
        const longitude = dataIp.data.lon;
        await connection('companies').insert({
            id,
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
    async delete(request,response){
        const id = request.headers.authorization;

        const companies = await connection('companies').where('id',id).select('id').first();
        try{
        if(companies.id !== id){
            response.status(401).json('Você não tem permissão para excluir essa conta!');
        }
        await connection('companies').where('id',id).delete();

        return response.status(204).send();
        }
        catch{
            return response.status(401).json('Você não tem permissão para excluir essa conta!');
        }
    }
}