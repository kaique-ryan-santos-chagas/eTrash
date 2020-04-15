const connection = require('../database/connection');
const crypto = require('crypto');
const axios = require('axios');

function hash(password){
	const hash = crypto.createHash('sha256');
	hash.update(password);
	return hash.digest('HEX');
}

module.exports = {
	index: async (req, res) => {
		const users = await connection('users').select('name', 'email');
		const [count] = await connection('users').count();
		console.log(count);
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
		const idUserDB = await connection('users').where('id', user_id)
		.select('id').first();

		if(idUserDB.id != user_id){
			return res.status(401).json({error: 'Operação não permitida!'});
		}  

		await connection('users').where('id', user_id).delete();
		return res.send();
	}

};
