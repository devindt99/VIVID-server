exports.up = function(knex) {
    return knex.schema.createTable('foods', function(table) {
      table.string('name').primary();
      table.text('description').nullable(); // Making description nullable since not all foods may need it
      table.integer('calories').nullable(); // Nullable field to store calories
    })
    .then(function() {
      // Add index on the calories column
      return knex.schema.table('foods', function(table) {
        table.index('calories');
      });
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('foods');
  };
  