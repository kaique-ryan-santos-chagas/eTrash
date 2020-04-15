exports.up = function(knex) {
	return knex.schema.createTable('user_discarts', function(table){
		table.increments();
		table.specificType('eletronic_discarts', 'text[]');
		table.string('user_id');
		

		table.foreign('user_id').references('id').inTable('users');
		
	});  
};

exports.down = function(knex) {
  	return knex.schema.dropTable('discarts');
};
