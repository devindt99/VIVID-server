exports.seed = function(knex) {
  // Deletes ALL existing entries in feelings_logs to avoid duplicates
  return knex('feelings_logs').del()
    .then(function () {
      // Inserts seed entries for feeling logs
      return knex('feelings_logs').insert([
        // Happiness logs
        { feeling_name: 'Happiness', intensity: 8, duration: 120 },
        { feeling_name: 'Happiness', intensity: 7, duration: 60 },
        // Sadness logs
        { feeling_name: 'Sadness', intensity: 6, duration: 90 },
        { feeling_name: 'Sadness', intensity: 5, duration: 120 },
        // Anger logs
        { feeling_name: 'Anger', intensity: 7, duration: 30 },
        // Fear logs
        { feeling_name: 'Fear', intensity: 9, duration: 45 },
        { feeling_name: 'Fear', intensity: 8, duration: 30 },
        // Surprise logs
        { feeling_name: 'Surprise', intensity: 5, duration: 15 },
        // Disgust logs
        { feeling_name: 'Disgust', intensity: 4, duration: 60 },
        // Trust logs
        { feeling_name: 'Trust', intensity: 8, duration: 180 },
        // Anticipation logs
        { feeling_name: 'Anticipation', intensity: 6, duration: 75 },
        // Joy logs
        { feeling_name: 'Joy', intensity: 10, duration: 120 },
        { feeling_name: 'Joy', intensity: 9, duration: 90 },
        // Love logs
        { feeling_name: 'Love', intensity: 10, duration: 150 },
        { feeling_name: 'Love', intensity: 10, duration: 120 }
      ]);
    });
};
