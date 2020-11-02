exports.up = function(knex) {
	return knex.schema.createTable('schedule', function(table){
		table.increments();
		table.string('company_id').notNullable();
		table.string('company_collector_id').notNullable();
		table.string('date_scheduling').notNullable();
		table.date('date_collect').notNullable();

		table.foreign('company_id').references('id').inTable('companies');
		table.foreign('company_collector_id').references('id').inTable('companies');
	});  
};

exports.down = function(knex) {
  	return knex.schema.dropTable('schedule');
};
