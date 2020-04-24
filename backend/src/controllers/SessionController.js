const connection = require('../database/connection');
const bcrypt = require('bcrypt');
const axios = require('axios');

module.exports = {
	create: async (req, res) => {
		const {username, passwordInput} = req.body;
		const usernameDB = await connection('users').where('name', username)
		.select('name').first();

		const passwordDB = await connection('users').where('name', username)
		.select('password').first();
		
		if(!usernameDB){
			return res.status(400).json({error: 'Usuário não encontrado'});
		}

		const passwordMatch = await bcrypt.compareSync(passwordInput, passwordDB.password);
		
		if (!passwordMatch) {
			return res.status(400).json({error: 'Senha incorreta'});
		}
		
		const dataCoord = await axios.get('http://www.ip-api.com/json');
		const localLat = dataCoord.data.lat;
		const localLon = dataCoord.data.lon;
		await connection('users').update({latitude: localLat, longitude: localLon });
		return res.json({user: username});
	}

};