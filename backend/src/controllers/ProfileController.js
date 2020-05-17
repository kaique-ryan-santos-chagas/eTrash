const connection = require('../database/connection');
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');

module.exports = {

	userProfile: async (req, res) => {
		const userId = req.headers.identification;		
		const matchIdUser = await connection('users').where('id', userId)
		.select('id').first();

		if(!matchIdUser){
			return res.status(400).json({error: 'Usuário não encontrado'});
		}
		
		const user = await connection('users').where('id', userId)
		.select('id', 
				'name', 
				'email', 
				'discarts', 
				'country', 
				'city', 
				'region', 
				'latitude', 
				'longitude').first();


		var userAvatarDir = await connection('uploads').where('user_id', userId)
		.select('key').first();

		if (!userAvatarDir) {
			userAvatarDir = null;
			return res.json({user, userAvatarDir});
		}

		const userAvatar = path.resolve(`../../temp/uploads/user/${userAvatarDir.key}`);
		return res.json({user, userAvatar});

	},

	updateUserAvatar: async (req, res) => {
		const userId = req.headers.identification;
		const userDB = await connection('users').where('id', userId)
		.select('id').first();

		if (!userDB) {
			return res.status(400).json({error: 'Usuário não encontrado'});
		}

		const oldAvatarKey = await connection('uploads').where('user_id', userId)
		.select('key').first();

		fs.unlink(`./temp/uploads/companies/${oldAvatarKey.key}`, function(err){
			if(err) throw err
			res.status(400).json("Imagem de perfil inexistente!");
		});

		const imgName = req.file.originalname;
		const size = req.file.size;
		const key = req.file.filename;
	    await connection('uploads').where('user_id', userDB.id)
		.update({ imgName: imgName, size: size, key: key });

		return res.json({sucess: 'Avatar atualizado'}); 
	},

	companyProfile: async (req, res) => {
		const companyId = req.headers.identification;		
		const matchIdCompany = await connection('companies').where('id', companyId)
		.select('id').first();

		if(!matchIdCompany){
			return res.status(400).json({error: 'Usuário não encontrado'});
		}
		
		const company = await connection('companies').where('id', companyId)
		.select('id', 
				'cnpj', 
				'name', 
				'email', 
				'discarts',
				'activity',
				'collector', 
				'country', 
				'city', 
				'region',
				'neightborhood',
				'phone', 
				'latitude', 
				'longitude').first();

		var companyAvatarDir = await connection('uploads').where('company_id', companyId)
		.select('key').first();

		if (!companyAvatarDir) {
			companyAvatarDir = null;
			return res.json({company, companyAvatarDir});
		}

		const companyAvatar = path.resolve(`../../temp/uploads/companies/${companyAvatarDir.key}`);
		return res.json({company, companyAvatar});

	},

	updateCompanyAvatar: async (req, res) => {
		const companyId = req.headers.identification;
		const companyDB = await connection('companies').where('id', companyId)
		.select('id').first();

		if (!companyDB) {
			return res.status(400).json({error: 'Empresa não encontrada'});
		}

		const oldCompanyKey = await connection('uploads').where('company_id', companyId)
		.select('key').first();

		fs.unlink(`./temp/uploads/companies/${oldCompanyKey.key}`, function(err){
			if(err) throw err
			res.status(400).json("Imagem de perfil inexistente!");
		});

		const imgName = req.file.originalname;
		const size = req.file.size;
		const key = req.file.filename;
		 await connection('uploads').where('company_id', companyDB.id)
		.update({ imgName: imgName, size: size, key: key });

		return res.json({sucess: 'Avatar atualizado'}); 
	},


	pointProfile: async (req, res) => {
		const pointId = req.headers.identification;		
		const matchIdPoint = await connection('discarts_points').where('id', pointId)
		.select('id').first();

		if(!matchIdPoint){
			return res.status(400).json({error: 'Ponto de coleta não encontrado'});
		}

		const point = await connection('discarts_points').where('id', pointId)
		.select('id', 
				'name', 
				'rua',
				'numero', 
				'discarts', 
				'country', 
				'city', 
				'region', 
				'latitude', 
				'longitude').first();

		var pointAvatarDir = await connection('uploads').where('point_id', pointId)
		.select('key').first();

		const pointAvatar = path.resolve(`../../temp/uploads/points/${pointAvatarDir.key}`);

		if (!pointAvatarDir) {
			pointAvatarDir = null;
			return res.json({point, pointAvatarDir});
		}

		return res.json({point, pointAvatar});

	},

	updatePointAvatar: async (req, res) => {
		const pointId = req.headers.identification;
		const pointDB = await connection('discarts_points').where('id', pointId)
		.select('id').first();

		if (!pointDB) {
			return res.status(400).json({error: 'Ponto de coleta não encontrado'});
		}

		const oldPointAvatarKey = await connection('uploads').where('point_id', pointId)
		.select('key').first();

		fs.unlink(`./temp/uploads/companies/${oldPointAvatarKey.key}`, function(err){
			if(err) throw err
			res.status(400).json("Imagem de perfil inexistente!");
		});


		const imgName = req.file.originalname;
		const size = req.file.size;
		const key = req.file.filename;
		await connection('uploads').where('point_id', pointDB.id)
		.update({ imgName: imgName, size: size, key: key });

		return res.json({sucess: 'Avartar atualizado'}); 
		
	}

};