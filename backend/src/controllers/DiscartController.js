const connection = require('../database/connection');


module.exports = {
	userCreate: async (req, res) => {
		const { user } = req.query;
		const { eTrash } = req.body;
		const userID_db = await connection('users').where('id', user)
		.select('id').first();

		if(!userID_db){
			return res.status(400).json({error: 'Usuário não encontrado'});
		}

		await connection('users').where('id', user).update({
			discarts: eTrash 
		});
		return res.json({sucess: 'Seus descartes foram atualizados'});
	},

	companyCreate: async (req, res) => {
		const { company } = req.query;
		const { eTrash } = req.body;
		const comapanyID_db = await connection('companies').where('id', company)
		.select('id').first();

		if(!companyID_db){
			return res.status(400).json({error: 'Usuário não encontrado'});
		}

		await connection('companies').where('id', company).update({
			discarts: eTrash 
		});
		return res.json({sucess: 'Seus descartes foram atualizados'});
	},
	
	pointCreate: async (req, res) => {
		const { point } = req.query;
		const { eTrash } = req.body;
		const pointID_db = await connection('users').where('id', point)
		.select('id').first();

		if(!pointID_db){
			return res.status(400).json({error: 'Usuário não encontrado'});
		}

		await connection('discarts_points').where('id', point).update({
			discarts: eTrash 
		});
		return res.json({sucess: 'Seus descartes foram atualizados'});
	
	},

	searchPointForUser: async (req, res) => {
		const { name } = req.body;
		const userDiscartsDB = await connection('users').where('name', name)
		.select('discarts').first();
		const pointDiscartsDB = await connection('discarts_points')
		.select('discarts');

		console.log(discarsUserDB);
		console.log(pointDiscartsDB);

		const discartPoints = userDiscarsDB.map(function(item){
			const pointFilter = pointDiscartsDB.filter(item);
			
			if (pointFilter === null) {
				return res.status(400)
				.json({error: 'Não há pontos que coletam esses descartes'});
			}
			
			return pointFilter;
		});

		const points = await connection('discarts_points')
		.where('discarts', discartPoints)
		.select('name', 'rua', 'numero', 'country', 'city', 'region');

		return res.json(discartPoints);
	}	

};