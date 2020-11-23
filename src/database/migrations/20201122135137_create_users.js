
exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments().notNullable();
    table.string('username').notNullable();
    table.string('tel_or_email').unique().notNullable();
    table.string('password').notNullable();
    table.string('cpf').notNullable();
    table.timestamp('birthdate').notNullable();
  })  
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
