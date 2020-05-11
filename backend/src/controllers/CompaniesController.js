const connection = require('../database/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const crypto = require('crypto');
const axios = require('axios');
    
function hash(password){
    const saltRounds = 12;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

function generateToken(params = {}){
	return jwt.sign(params, authConfig.secret,{
		expiresIn:86400,
	});
}

module.exports = {
   async index(request, response){
        const companies = await connection('companies')
        .select('id', 
                'name', 
                'email',
                'activity',
                'collector', 
                'country', 
                'city', 
                'region', 
                'neightborhood',
                'phone',
                'latitude', 
                'longitude');

        const [count] = await connection('companies').count();

        response.header('Total-Companies-Count', count['count']);

        return response.json(companies);
    },

    async create(request, response){
        const { 
              cnpj, 
              passwordInput, 
              collector,
              country,
              city,
              region,
              latitude,
              longitude } = request.body;

        const id = crypto.randomBytes(5).toString("HEX");
        const password = hash(passwordInput);
        const dataCNPJ = await axios.get(`https://www.receitaws.com.br/v1/cnpj/${cnpj}`);
        
        if (dataCNPJ.data.status == "ERROR") {
            return response.status(400).json({error: dataCNPJ.data.message});
        }

        const name = dataCNPJ.data.nome;
        const email = dataCNPJ.data.email;
        const activity = dataCNPJ.data.atividade_principal[0].text;
        const phone = dataCNPJ.data.telefone;
        const neightborhood = dataCNPJ.data.bairro;
        
        await connection('companies').insert({
            id,
            cnpj,
            name,
            email,
            password,
            activity,
            collector,
            country,
            city,
            region,
            neightborhood,
            phone,
            latitude, 
            longitude
        });

        return response.json({
        sucess: "Companhia cadastrada com sucesso",
        token: generateToken({id: id})
    });
    
    },
    
    async delete(request, response){
        const companyId = req.headers.identification;
        const { passwordInput } = request.body;

        const companyIdBD = await connection('companies').where('id', companyId)
        .select('id').first();

        if(!companyIdBD){
            return response.status(401).json({error: 'Operação não permitida'});
        }

        const passwordDB = await connection('companies').where('id', companyIdBD.id)
        .select('password').first();

        const companyMatch = bcrypt.compareSync(passwordInput, passwordDB.password);
        
        if (!companyMatch) {
            return response.status(401).json({error: 'Senha Inválida'});
        }

        await connection('uploads').where('company_id', companyIdBD.id).delete();
        await connection('companies').where('id', companyIdBD.id).delete();
        return response.send();
    },
    
    async upload(request, response){
        const companyId = request.headers.identification;
        const companyIDDB = await connection('companies').where('id', companyId)
        .select('id').first();

        if (!companyIDDB) {
            return res.status(400).json({error: 'Empresa não encontrado.'})
        }
        
        const id = crypto.randomBytes(5).toString('HEX');
        const company_id = userIDDB.id;
        const imgName = req.file.originalname;
        const size = req.file.size;
        const key = req.file.filename;
        await connection('uploads').insert({
            id,
            imgName,
            size,
            key,
            company_id
        }); 
        return response.json({sucess:"Imagem carregada com sucesso!" });
    
    },

    async scheduling(request, response){
        const company_id = request.headers.identification;
        const { nameCollector, date } = request.body;
        
        const companyDB = await connection('companies').where('id', company_id)
        .select('id').first();

        const idCollector = await connection('companies').where('name', nameCollector)
        .select('id').first();

        if (!companyDB) {
            return res.status(400).json({error: 'Empresa não encontrada'});
        }

        if (!idCollector) {
            return res.status(400).json({error: 'Empresa não encontrada'});
        }

        const company_id_collector = idCollector.id;
        const date_scheduling = Date.now;
        const date_collect = date;
        await connection('schedule').insert({
            company_id,
            company_id_collector,
            date_scheduling,
            date_collect
        });

        return res.json({sucess: 'Coleta Solicitada'});
    }
        
};
    
