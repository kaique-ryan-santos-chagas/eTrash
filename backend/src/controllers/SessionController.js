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
        const {email, passwordInput, localLat, localLon} = req.body;
        const userIDDB = await connection('users').where('email', email).select('id').first();

        const passwordDB = await connection('users').where('id', userIDDB.id)
        .select('password').first();
        
        if(!userIDDB){
            return res.status(400).json({error: 'Usuário não encontrado'});
        }

        const passwordMatch = await bcrypt.compareSync(passwordInput, passwordDB.password);
        
        if (!passwordMatch) {
            return res.status(400).json({error: 'Senha incorreta'});
        }

        const userName = await connection('users').where('id', userIDDB.id).select('name').first();
        
        await connection('users').where('id', userIDDB.id).update({latitude: localLat, longitude: localLon });
        return res.json({
            id: userIDDB.id,
            user: userName.name,
            token: generateToken({id: userIDDB.id})
        });

    },

    companyCreate: async (req, res) => {
        const {email, passwordInput, localLat, localLon} = req.body;
        const companyID = await connection('companies').where('email', email).select('id')
        .first();

        if (!companyID) {
            return res.status(400).json({error: 'Empresa não encontrada'});
        }

        const companyPasswordDB = await connection('companies').where('id', companyID.id)
        .select('password')
        .first();
        const passwordMatch = await bcrypt.compareSync(passwordInput, companyPasswordDB.password);
        
        if (!passwordMatch) {
            return res.status(400).json({error: 'Senha Inválida'});
        }

        const companyName = await connection('companies').where('id', companyID.id).select('name').first();

        await connection('companies').where('id', companyID.id).update({latitude: localLat, longitude: localLon });
        return res.json({
            id: company.id,
            company: companyName.name,
            token: generateToken({id: companyID.id})
        });

    },

    pointCreate: async (req, res) => {
        const {name, passwordInput, localLat, localLon} = req.body;
        const pointID = await connection('discarts_points').where('name', name).select('id')
        .first();

        if (!pointID) {
            return res.status(400).json({error: 'Ponto de coleta não encontrado'});
        }

        const pointPasswordDB = await connection('discarts_points').where('id', pointID.id)
        .select('password')
        .first();
        const passwordMatch = await bcrypt.compareSync(passwordInput, pointPasswordDB.password);
        
        if (!passwordMatch) {
            return res.status(400).json({error: 'Senha Inválida'});
        }

        await connection('discarts_points').where('id', pointID.id).update({latitude: localLat, longitude: localLon });
        return res.json({
            id: pointID.id,
            point: name,
            token: generateToken({id: pointID.id})
        });
    }
};