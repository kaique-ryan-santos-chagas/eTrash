const connection = require('../database/connection');
const axios = require('axios');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

function hash(password){
	const saltRounds = 12;
	const salt = bcrypt.genSaltSync(saltRounds);
	const hash = bcrypt.hashSync(password, salt);
	return hash;
}

module.exports = {
    index: async (request,response) => {
        const companies = await connection('discarts_points').select('name','rua','numero','numero','discarts','country','city','region');
        const [count] = await connection('companies').count();

        response.header('Total-Companies-Count',count['count']);
        return response.json(companies);
    },
   	
   	create: async (request,response) => {
        const {name, passwordInput, discarts, rua, numero} = request.body;
        const password = hash(passwordInput);
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
            password,
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
    
    delete: async (request,response) => {
        const point_id = request.headers.authorization;
        const { passwordInput } = request.body;
        const idSearch = await connection('discarts_points').where('id', point_id).select('id')
        .first();
        
        if(!idSearch){
            return response.status(401).json({error: "Você não tem permissão para deletar este ponto!"});
        }

        const passwordDB = await connection('discarts_points').where('id', point_id)
        .select('password').first();
        const passwordMatch = await bcrypt.compareSync(passwordInput, passwordDB.password);

        if(!passwordMatch){
        	return response.status(400).json({error: 'Senha inválida'});
        }
        
        await connection('discarts_points').where('id', point_id).delete();
        return response.json('Ponto deletado com sucesso!');
    }

}    
