const connection = require('../database/connection');
const bcrypt = require('bcrypt');
const axios = require('axios');

module.exports = {
    create: async (request, response) => {
        const {name, passwordInput} = request.body;
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
        await connection('users').update({latitude: localLat, longitude: localLon });
        return response.json({companie: name});

    }

};