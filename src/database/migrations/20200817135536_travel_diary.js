exports.up = function(knex) {
  return knex.schema.createTable('travel_diary', function(table) {
    table.increments();
    table.string('name').notNullable();
    table.string('description').notNullable();

    table.integer('user_id');
    table.foreign('user_id').references('id').inTable('users');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('travel_diary');  
};
