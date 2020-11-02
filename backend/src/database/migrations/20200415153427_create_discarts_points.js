exports.up = function(knex) {
	return knex.schema.createTable('discarts_points', function(table){
		table.string('id').primary();
		table.string('name').notNullable();
		table.string('email').notNullable();
		table.string('password').notNullable();
		table.string('password_reset_token');
		table.date('password_reset_expires');
		table.string('rua').notNullable();
		table.integer('numero');
		table.specificType('discarts', 'text[]').notNullable();
		table.string('country').notNullable();
		table.string('city').notNullable();
		table.string('region').notNullable();
		table.float('longitude').notNullable();
		table.float('latitude').notNullable();

	});  
};

exports.down = function(knex) {
  	return knex.schema.dropTable('discarts_points');
};
