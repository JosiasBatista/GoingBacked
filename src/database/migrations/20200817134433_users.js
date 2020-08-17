exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
    table.increments();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.integer('travels').defaultTo(0);
  });  
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');  
};
