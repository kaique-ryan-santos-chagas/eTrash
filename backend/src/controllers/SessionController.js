const connection = require('../database/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');


function generateToken(params = {}){
	return jwt.sign(params, authConfig.secret,{
		expiresIn:86400,
	});
}

module.exports = {
	userCreate: async (req, res) => {
		const {username, passwordInput, localLat, localLon} = req.body;

		const usernameID = await connection('users').where('name', username).select('id').first();

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
		
		await connection('users').update({latitude: localLat, longitude: localLon });
		return res.json({
        user: username, 
        token: generateToken({id: usernameID.id})
        });
	},

	companyCreate: async (req, res) => {
        const {name, passwordInput, localLat, localLon} = req.body;
        const companieID = await connection('companies').where('name',name).select('id')
        .first();

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

        await connection('companies').update({latitude: localLat, longitude: localLon });
        return res.json({
        companie: name,
        token: generateToken({id: companieID.id})
        });
	},

	pointCreate: async (req, res) => {
        const {name, passwordInput, localLat, localLon} = req.body;
        const pointID = await connection('discarts_points').where('name',name).select('id')
        .first();

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

        await connection('discarts_points').update({latitude: localLat, longitude: localLon });
        return res.json({
            point: name,
            token: generateToken({id: pointID.id})
        });
	}
	}