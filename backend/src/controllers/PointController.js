const connection = require('../database/connection');
const axios = require("axios");
const crypto = require("crypto");

module.exports = {
    async index(request,response){
        const companies = await connection('discarts_points').select('name','rua','numero','numero','discarts','country','city','region');
        const [count] = await connection('companies').count();

        response.header('Total-Companies-Count',count['count']);
        return response.json(companies);
    },
    async create(request,response){
        const {name,discarts,rua,numero} = request.body;

        const id = crypto.randomBytes(5).toString("HEX");

        const dataIp = await axios.get("http://ip-api.com/json");

        const country = dataIp.data.country;
        const city = dataIp.data.city;
        const region = dataIp.data.region;
        const latitude = dataIp.data.lat;
        const longitude = dataIp.data.lon;

        await connection('discarts_points').insert({
            id,
            name,
            discarts,
            rua,
            numero,
            country,
            city,
            region,
            latitude,
            longitude
        });
        return response.json({reposta: "Ponto registrado com sucesso!"});
    },
    async delete(request,response){
        const id = request.headers.authorization;

        const idSearch = await connection('discarts_points').where('id',id).select('id').first();
        if(idSearch.id !== id){
            return response.status(401).json("Você não tem permissão para deletar este ponto!");
        }

        await connection('discarts_points').where('id',id).select('*').delete();

        return response.status(200).json('Ponto deletado com sucesso!');
    }

    }    
