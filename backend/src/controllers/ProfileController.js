const connection = require('../database/connection');
const bcrypt = require('bcrypt');
const path = require('path');

module.exports = {
	userProfile: async (req, res) => {
		const userId = req.headers.identification;		
		const matchIdUser = await connection('users').where('id', userId)
		.select('id').first();

		if(!matchIdUser){
			return res.json({error: 'Usuário não encontrado'});
		}

		var userAvatarDir = await connection('uploads').where('user_id', userId)
		.select('key').first();

		if (!userAvatarDir) {
			userAvatarDir = "";
		}

		const userAvatar = path.basename(`../../temp/uploads/user/${userAvatarDir.key}`);
		const user = await connection('users').where('id', userId)
		.select('id', 'name', 'email', 'discarts', 'country', 'city', 'region', 'latitude', 'longitude')
		.first();


		return res.json({user, userAvatar});
	}
};