exports.up = function (knex) {
  knex.schema.createTable('users', (column) => {
    column.increments();
    column.string('username', 128).notNullable().unique();
    column.string('password', 128).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users');
};
