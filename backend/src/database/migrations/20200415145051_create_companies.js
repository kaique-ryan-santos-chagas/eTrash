exports.up = function(knex) {
	return knex.schema.createTable('companies', function(table){
		table.string('id').primary();
		table.string('name').notNullable();
		table.string('email').notNullable();
		table.string('password').notNullable();
		table.specificType('discarts', 'text[]');
		table.string('country').notNullable();
		table.string('city').notNullable();
		table.string('region').notNullable();
		table.float('longitude').notNullable();
		table.float('latitude').notNullable();
	});
};

exports.down = function(knex) {
	return knex.schema.dropTable('companies');
};
