const connection = require('../database/connection');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const fs = require('fs');
const path = require('path');

function hash(password){
	const saltRounds = 12;
	const salt = bcrypt.genSaltSync(saltRounds);
	const hash = bcrypt.hashSync(password, salt);
	return hash;
}

function generateToken(params = {}){
	return jwt.sign(params, authConfig.secret,{
		expiresIn: 86400,
	});
}


module.exports = {
	index: async (req, res) => {
		const users = await connection('users').select('name', 'email', 'discarts');
		const [count] = await connection('users').count();
		res.header('X-Total-Count', count['count']);
		
		const usersAvatarsKey = await connection('uploads').whereNotNull('user_id').select('key');

		const usersAvatars = usersAvatarsKey.map(function(item){
			const key = item.key;
			const avatar = path.resolve(`../../temp/uploads/users/${key}`);
			return avatar;
		}); 
		return res.json({users, avatar: usersAvatars});
	},

	create: async (req, res) => {
		const {name, 
			   email, 
			   passwordInput, 
			   country, 
			   city, 
			   region, 
			   latitude,
			   longitude } = req.body;

		const id = crypto.randomBytes(5).toString('HEX');
		const password = hash(passwordInput);
		
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
		return res.json({'Bem-Vindo': name, id: id,  token: generateToken({id: id})});
	},

	delete: async (req, res) => {
		const userId = req.headers.identification;
		const { passwordInput } = req.body;

		const userIDDB = await connection('users').where('id', userId)
		.select('id').first();

		if(!userIDDB){
			return res.status(401).json({error: 'Operação não permitida!'});
		}

		const userPasswordMatch = await connection('users').where('id', userIDDB.id)
		.select('password').first();

		const passwordMatch = await bcrypt.compareSync(passwordInput, userPasswordMatch.password);

		if (!passwordMatch) {
			return res.status(401).json({error: 'Senha incorreta'});
		}

		const oldAvatarKey = await connection('uploads').where('user_id', userId).select('key')
		.first();
		
		await fs.unlink(`./temp/uploads/users/${oldAvatarKey.key}`, function(err){
			if(err) throw err;
		});
		
		await connection('uploads').where('user_id', userId).delete();
		await connection('users').where('id', userId).delete();
		return res.send();
		
	},
	
	upload: async (req, res) => {
		const userId = req.headers.identification;
		const userIDDB = await connection('users').where('id', userId)
		.select('id').first();

		if (!userIDDB) {
			return res.status(400).json({error: 'Usuário não encontrado.'})
		}
		
		const id = crypto.randomBytes(5).toString('HEX');
		const user_id = userIDDB.id;
		const imgName = req.file.originalname;
		const size = req.file.size;
		const key = req.file.filename;
		await connection('uploads').insert({
			id,
			imgName,
			size,
			key,
			user_id
		}); 
		return res.json({sucess:"Imagem carregada com sucesso!" });
	}

};
