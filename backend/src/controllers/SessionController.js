const connection = require('../database/connection');
const bcrypt = require('bcrypt');
const axios = require('axios');

module.exports = {
	userCreate: async (req, res) => {
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
	},

	companyCreate: async (req, res) => {
		const {name, passwordInput} = req.body;
        const companieNameDB = await connection('companies').where('name', name)
        .first();

        if (!companieNameDB) {
            return res.status(400).json({error: 'Empresa não encontrada'});
        }

        const companiePasswordDB = await connection('companies').where('name', name)
        .select('password')
        .first();
        const passwordMatch = await bcrypt.compareSync(passwordInput, companiePasswordDB.password);
        
        if (!passwordMatch) {
            return res.status(400).json({error: 'Senha Inválida'});
        }

        const dataCoord = await axios.get('http://www.ip-api.com/json');
        const localLat = dataCoord.data.lat;
        const localLon = dataCoord.data.lon;
        await connection('companies').update({latitude: localLat, longitude: localLon });
        return res.json({companie: name});
	},

	pointCreate: async (req, res) => {
		const {name, passwordInput} = req.body;
        const pointNameDB = await connection('discarts_points').where('name', name)
        .first();

        if (!pointNameDB) {
            return res.status(400).json({error: 'Empresa não encontrada'});
        }

        const pointPasswordDB = await connection('discarts_points').where('name', name)
        .select('password')
        .first();
        const passwordMatch = await bcrypt.compareSync(passwordInput, pointPasswordDB.password);
        
        if (!passwordMatch) {
            return res.status(400).json({error: 'Senha Inválida'});
        }

        const dataCoord = await axios.get('http://www.ip-api.com/json');
        const localLat = dataCoord.data.lat;
        const localLon = dataCoord.data.lon;
        await connection('discarts_points').update({latitude: localLat, longitude: localLon });
        return res.json({point: name});
	}

};