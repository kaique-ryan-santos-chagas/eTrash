const connection = require('../database/connection');
const crypto = require('crypto');
const axios = require('axios');
const bcrypt = require('bcrypt');

function hash(password){
	const saltRounds = 15;
	const salt = bcrypt.genSaltSync(saltRounds);
	const hash = bcrypt.hashSync(password, salt);
	return hash;
}


module.exports = {
	index: async (req, res) => {
		const users = await connection('users').select('name', 'email');
		const [count] = await connection('users').count();
		res.header('X-Total-Count', count['count']);
		return res.json(users);
	},

	create: async (req, res) => {
		const {name, email, passwordInput} = req.body;
		const id = crypto.randomBytes(5).toString('HEX');
		const password = hash(passwordInput);
		const dataIp = await axios.get('http://ip-api.com/json');
		const country = dataIp.data.country;
		const city = dataIp.data.city;
		const region = dataIp.data.region;
		const latitude = dataIp.data.lat;
		const longitude = dataIp.data.lon;
		await connection('users').insert({
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
		return res.json({'Bem-Vindo': name});
	},

	delete: async (req, res) => {
		const user_id = req.headers.authorization;
		const passwordInput = req.body; 
		const idUserDB = await connection('users').where('id', user_id)
		.select('id').first();
		
		if(idUserDB.id != user_id){
			return res.status(401).json({error: 'Operação não permitida!'});
		} 

		const passwordDB = await connection('users').where('id', user_id)
		.select('password')
		.first();
		
		const userMacth = bcrypt.compare(passwordInput, passwordDB.password);
		if(!userMacth){
			return res.status(401).json({error: 'Senha Inválida!'});
		}
		await connection('users').where('id', user_id).delete();
		return res.send();
	}

};