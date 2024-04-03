exports.up = function(knex) {
    return knex.schema.dropTableIfExists('activities_logs')
      .then(function() {
        return knex.schema.createTable('activities_logs', function(table) {
          table.increments('activities_logs_id').primary(); // Custom ID column name
          table.string('activity_name').notNullable(); // Changed to string instead of varchar
          table.integer('activity_calories_burned').notNullable();
          table.integer('duration').notNullable();
          table.dateTime('created_at').defaultTo(knex.fn.now());
  
          // Define foreign key constraints
          table.foreign('activity_name').references('name').inTable('activities').onDelete('CASCADE').onUpdate('CASCADE');
          table.foreign('activity_calories_burned').references('calories_burned').inTable('activities').onDelete('CASCADE').onUpdate('CASCADE');
        });
      });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('activities_logs');
  };
  