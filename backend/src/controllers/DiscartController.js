const connection = require('../database/connection');
const stringSimilarity = require('string-similarity');
const itertools = require('itertools');
const path = require('path');


module.exports = {
	userCreate: async (req, res) => {
		const id = req.headers.identification;
		const { userDiscarts } = req.body;
		const userIDDB = await connection('users').where('id', id)
		.select('id').first();

		if(!userIDDB){
			return res.status(400).json({error: 'Usuário não encontrado'});
		}

		await connection('users').where('id', userIDDB.id).update({
			discarts: userDiscarts 
		});
		return res.json({sucess: 'Seus descartes foram atualizados'});
	},

	companyCreate: async (req, res) => {
		const { companyName, companyDiscarts } = req.body;
		const companyIDDB = await connection('companies').where('name', companyName)
		.select('id').first();

		if(!companyIDDB){
			return res.status(400).json({error: 'Usuário não encontrado'});
		}

		await connection('companies').where('id', companyIDDB.id).update({
			discarts: companyDiscarts
		});
		return res.json({sucess: 'Seus descartes foram atualizados'});
	},
	
	pointCreate: async (req, res) => {
		const { pointName, pointDiscarts } = req.body;
		const pointIDDB = await connection('discarts_points')
		.where('name', pointName)
		.select('id').first();

		if(!pointIDDB){
			return res.status(400).json({error: 'Ponto não encontrado'});
		}

		await connection('discarts_points').where('id', pointIDDB.id).update({
			discarts: pointDiscarts 
		});
		return res.json({sucess: 'Seus descartes foram atualizados'});
	
	},

	searchPointForUser: async (req, res) => {
		const user_id = req.headers.identification;
		const userDiscartsDB = await connection('users').where('id', user_id)
		.select('discarts').first();

		if(!userDiscartsDB){
			return res.status(400).json({error: 'Usuário não encontrado'});
		}

		const discartPointsDB = await connection('discarts_points')
		.where('discarts', userDiscartsDB.discarts)
		.select('name', 
		        'rua', 
		        'numero', 
				'discarts', 
				'country', 
				'city', 
				'region',
				'latitude',
				'longitude'
		       );


		if (userDiscartsDB.discarts[0] == null) {
			return res.status(400).json({error: 'Não encontramos seus descartes'});
		}

		if (discartPointsDB[0] == null) {
		   const userDiscartArr = userDiscartsDB.discarts;
		   const discartsOfPoints = await connection('discarts_points')
		   .select('discarts');

		   const discartPointArr = discartsOfPoints.map(function(item){
			return item.discarts;
		   });		


		   const matchDiscartArr = discartPointArr.map(function(item){
		       const stringUserDiscart = userDiscartArr.join(' ');
		       const stringDiscartPoint = item.join(' ');
		       const compareDiscarts = stringSimilarity.compareTwoStrings(stringUserDiscart, stringDiscartPoint);
		       if (compareDiscarts >= 0.10) {
		          return item;
		       } 
		   });

			
		   const matchDiscartFilter = matchDiscartArr.filter(function(item){
		       return item != undefined && Array.isArray(item);
		   });

		   const pointDB = await connection('discarts_points')
		   .select('name', 
		           'rua', 
			   	   'numero', 
			   	   'discarts', 
			       'country', 
			       'city', 
			       'region',
			       'latitude',
			       'longitude'
			      );
			
		  if(matchDiscartFilter[0] != null){
		     const foundPoints = pointDB.filter(function(item){
		        for (const [x, y] of itertools.izipLongest(item.discarts, itertools.cycle(matchDiscartFilter), fillvalue='')) {
			    	const discartMatch = stringSimilarity.findBestMatch(x, y);
			    	if (discartMatch.bestMatch.rating > 0.10) {
			        	return item;
			        }				
			 	}
		     });

		      if (foundPoint[0] == "") {
		          return res.status(400).json({error: 'Nenhum ponto de coleta disponível'});
		      }
				
	          // response for result of search
	          const avatarPointsUpload = await connection('uploads').select('*');
	  		  const avatarPoints = avatarPointsUpload.filter(function(item){
	   			for(const [upPointId, disPointId] of itertools.izipLongest(item.point_id, itertools.cycle(foundPoints.id), fillvalue='')){
	   				if(upPointId == disPointId){
	   					const avatar = path.resolve(`../../temp/uploads/points/${item.key}`);
	   					return avatar;
	   				}
	   			}
	   		  });

		      return res.json({foundPoints, avatar: avatarPoints});
		  }
		// case the filter return empty array
		return res.status(400).json({error: 'Nenhum ponto de coleta encontrado'});
	   }
	   // case the dsiacarts of user return total Match with point discarts
	   const avatarPointsUpload = await connection('uploads').select('*');
	   const avatarPoints = avatarPointsUpload.filter(function(item){
	   		for(const [upPointId, disPointId] of itertools.izipLongest(item.point_id, itertools.cycle(discartPointsDB.id), fillvalue='')){
	   			if(upPointId == disPointId){
	   				const avatar = path.resolve(`../../temp/uploads/points/${item.key}`);
	   				return avatar;
	   			}
	   		}
	   });
       return res.json({discartPointsDB, avatar: avatarPoints});
	}	

};
