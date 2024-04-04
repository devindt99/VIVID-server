exports.seed = function(knex) {
  // Deletes ALL existing entries in feelings_logs to avoid duplicates
  return knex('feelings_logs').del()
    .then(function () {
      // Inserts seed entries for feeling logs
      return knex('feelings_logs').insert([
        // Happiness logs
        { feeling_name: 'Happiness', intensity: 8, duration: 120, created_at: knex.raw('CURRENT_DATE - INTERVAL ? DAY', [30]) },
        { feeling_name: 'Happiness', intensity: 7, duration: 60, created_at: knex.raw('CURRENT_DATE - INTERVAL ? DAY', [45]) },
        // Sadness logs
        { feeling_name: 'Sadness', intensity: 6, duration: 90, created_at: knex.raw('CURRENT_DATE - INTERVAL ? DAY', [20]) },
        { feeling_name: 'Sadness', intensity: 5, duration: 120, created_at: knex.raw('CURRENT_DATE - INTERVAL ? DAY', [60]) },
        // Anger logs
        { feeling_name: 'Anger', intensity: 7, duration: 30, created_at: knex.raw('CURRENT_DATE - INTERVAL ? DAY', [55]) },
        // Fear logs
        { feeling_name: 'Fear', intensity: 9, duration: 45, created_at: knex.raw('CURRENT_DATE - INTERVAL ? DAY', [40]) },
        { feeling_name: 'Fear', intensity: 8, duration: 30, created_at: knex.raw('CURRENT_DATE - INTERVAL ? DAY', [75]) },
        // Surprise logs
        { feeling_name: 'Surprise', intensity: 5, duration: 15, created_at: knex.raw('CURRENT_DATE - INTERVAL ? DAY', [85]) },
        // Disgust logs
        { feeling_name: 'Disgust', intensity: 4, duration: 60, created_at: knex.raw('CURRENT_DATE - INTERVAL ? DAY', [70]) },
        // Trust logs
        { feeling_name: 'Trust', intensity: 8, duration: 180, created_at: knex.raw('CURRENT_DATE - INTERVAL ? DAY', [25]) },
        // Anticipation logs
        { feeling_name: 'Anticipation', intensity: 6, duration: 75, created_at: knex.raw('CURRENT_DATE - INTERVAL ? DAY', [35]) },
        // Joy logs
        { feeling_name: 'Joy', intensity: 10, duration: 120, created_at: knex.raw('CURRENT_DATE - INTERVAL ? DAY', [50]) },
        { feeling_name: 'Joy', intensity: 9, duration: 90, created_at: knex.raw('CURRENT_DATE - INTERVAL ? DAY', [80]) },
        // Love logs
        { feeling_name: 'Love', intensity: 10, duration: 150, created_at: knex.raw('CURRENT_DATE - INTERVAL ? DAY', [15]) },
        { feeling_name: 'Love', intensity: 10, duration: 120, created_at: knex.raw('CURRENT_DATE - INTERVAL ? DAY', [70]) },
        // Insert more logs here...
      ]);
    });
};
