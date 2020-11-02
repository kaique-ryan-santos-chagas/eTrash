exports.up = function(knex) {
	return knex.schema.createTable('uploads', function(table){
		table.string('id').primary();
		table.string('imgName').notNullable();
		table.integer('size').notNullable();
		table.string('key').notNullable();
		table.string('user_id');
		table.string('company_id');
		table.string('point_id');

		table.foreign('user_id').references('id').inTable('users');
		table.foreign('company_id').references('id').inTable('companies');
		table.foreign('point_id').references('id').inTable('discarts_points');
		
	}); 
};

exports.down = function(knex) {
	return knex.schema.dropTable('uploads');
};
