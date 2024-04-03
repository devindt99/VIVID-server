exports.up = function(knex) {
    return knex.schema.dropTableIfExists('foods_logs')
      .then(function() {
        return knex.schema.createTable('foods_logs', function(table) {
          table.increments('foods_logs_id').primary(); // Custom ID column name
          table.string('food_name').notNullable();
          table.foreign('food_name').references('foods.name').onDelete('CASCADE').onUpdate('CASCADE');
          table.integer('food_calories').notNullable();
          table.foreign('food_calories').references('foods.calories').onDelete('CASCADE').onUpdate('CASCADE');
          table.integer('quantity').notNullable();
          table.dateTime('created_at').defaultTo(knex.fn.now());
        });
      });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('foods_logs');
  };
  