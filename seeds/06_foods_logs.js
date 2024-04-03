exports.seed = function(knex) {
    // Deletes ALL existing entries in foods_logs to avoid duplicates
    return knex('foods_logs').del()
      .then(function () {
        // Inserts seed entries for foods logs
        return knex('foods_logs').insert([
          { 
            food_name: 'Apple', 
            quantity: 1, 
            food_calories: 95, 
            created_at: knex.fn.now() 
          },
          { 
            food_name: 'Banana', 
            quantity: 1, 
            food_calories: 105, 
            created_at: knex.fn.now() 
          },
          { 
            food_name: 'Chicken Breast', 
            quantity: 1, 
            food_calories: 165, 
            created_at: knex.fn.now() 
          },
          // Add more food logs as needed
        ]);
      });
  };
