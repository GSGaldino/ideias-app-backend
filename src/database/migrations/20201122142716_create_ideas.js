
exports.up = function(knex) {
  return knex.schema.createTable('ideas', table => {
    table.increments();

    table.string('ideaname').notNullable();
    table.string('image_url').notNullable();
    table.string('description').notNullable();
    table.decimal('value').notNullable();

    table.string('user_id').notNullable();

    table.foreign('user_id').references('id').inTable('users');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('ideas');
};
