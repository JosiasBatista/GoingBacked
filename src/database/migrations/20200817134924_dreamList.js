exports.up = function(knex) {
  return knex.schema.createTable('dream_list', function(table) {
    table.increments();
    table.string('place').notNullable();
    table.string('description').notNullable();
    table.string('type').defaultTo('');
    table.integer('priority').defaultTo(0);
    
    table.integer('user_id');
    table.foreign('user_id').references('id').inTable('users');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('dream_list');
};
