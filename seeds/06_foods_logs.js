exports.seed = function(knex) {
  // Deletes ALL existing entries in foods_logs to avoid duplicates
  return knex('foods_logs').del()
    .then(function () {
      // Inserts seed entries for foods logs with a mix of dates within the last 60 days
      return knex('foods_logs').insert([
        { 
          food_name: 'Apple', 
          quantity: 1, 
          food_calories: 95, 
          created_at: knex.raw('CURRENT_DATE - INTERVAL ? DAY', [20]) 
        },
        { 
          food_name: 'Banana', 
          quantity: 1, 
          food_calories: 105, 
          created_at: knex.raw('CURRENT_DATE - INTERVAL ? DAY', [40]) 
        },
        { 
          food_name: 'Chicken Breast', 
          quantity: 1, 
          food_calories: 165, 
          created_at: knex.raw('CURRENT_DATE - INTERVAL ? DAY', [55]) 
        },
        // Add more food logs as needed
      ]);
    });
};
