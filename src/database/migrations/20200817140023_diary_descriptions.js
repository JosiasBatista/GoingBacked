exports.up = function(knex) {
  return knex.schema.createTable('diary_descriptions', function(table) {
    table.increments();
    table.string('description').notNullable();

    table.integer('diary_id');
    table.foreign('diary_id').references('id').inTable('travels_diary');
  });
};
                                
exports.down = function(knex) {
  return knex.schema.dropTable('diary_descriptions');  
};
