exports.up = function(knex) {
    return knex.schema.createTable('activities', function(table) {
      table.string('name').primary();
      table.text('description').nullable(); // Making description nullable since not all activities may need it
      table.integer('calories_burned').nullable(); // Nullable field to store calories burned
    })
    .then(function() {
      // Add index on the calories_burned column
      return knex.schema.table('activities', function(table) {
        table.index('calories_burned');
      });
    });
  };
exports.down = function(knex) {
  return knex.schema
    .table('activities_logs', function(table) {
      table.dropForeign('activity_name');
    })
    .then(function() {
      return knex.schema.dropTableIfExists('activities');
    });
};
