const connection = require('../database/connection');
const bcrypt = require('bcrypt');


module.exports = {
	create: async (req, res) => {
		const {username, passwordInput} = req.body;
		const usernameDB = await connection('users').where('name', username)
		.select('name').first();

		const passwordDB = await connection('users').where('name', username)
		.select('password').first();

		if(usernameDB.name != username){
			return res.status(400).json({error: 'User not found'});
		}
		const passwordMatch = await bcrypt.compareSync(passwordInput, passwordDB.password);
		if (!passwordMatch) {
			return res.status(400).json({error: 'Senha incorreta'});
		}
		return res.json(passwordDB.password);
	}

};