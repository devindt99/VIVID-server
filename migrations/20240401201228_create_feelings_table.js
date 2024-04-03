exports.up = function(knex) {
    return knex.schema.createTable('feelings', function(table) {
      table.string('name').primary();
      table.text('description').nullable(); // Making description nullable since it's most feelings don't need explanation
    });
  };
  
  exports.down = function(knex) {
    return knex.schema
      .table('feeling_logs', function(table) {
        table.dropForeign('feeling_name');
      })
      .then(function() {
        return knex.schema.raw('DROP TABLE IF EXISTS feelings CASCADE');
      });
  };
  