
exports.up = function(knex) {
    return knex.schema.createTable('favorites', tbl => {
        tbl.increments();
        tbl
          .integer('user_id')
          .unsigned()
          .notNullable()
        tbl
          .foreign('user_id')
          .references('id')
          .inTable('users')
        tbl
          .string('name', 16)
          .notNullable()
        tbl
          .string('region', 4)
          .notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('favorites')
};