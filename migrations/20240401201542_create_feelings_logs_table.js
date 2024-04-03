exports.up = function(knex) {
    return knex.schema.dropTableIfExists('feelings_logs')
      .then(function() {
        return knex.schema.createTable('feelings_logs', function(table) {
          table.increments('feelings_logs_id').primary(); // Custom ID column name
          table.string('feeling_name').notNullable();
          table.foreign('feeling_name').references('feelings.name').onDelete('CASCADE').onUpdate('CASCADE');
          table.integer('duration').notNullable(); 
          table.integer('intensity').notNullable(); 
          table.dateTime('created_at').defaultTo(knex.fn.now());
        });
      });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('feelings_logs');
  };
  