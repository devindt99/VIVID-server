require("dotenv").config();

exports.seed = function(knex) {
  console.log('Starting activities logs seed file...');

  // Define the entries to insert for activities logs
  const entries = [
    { 
      activity_name: 'Running', 
      duration: 30, 
      created_at: knex.fn.now() 
    },
    { 
      activity_name: 'Cycling', 
      duration: 45, 
      created_at: knex.fn.now() 
    },
    { 
      activity_name: 'Swimming', 
      duration: 60, 
      created_at: knex.fn.now() 
    },
    { 
      activity_name: 'Reading', 
      duration: 120, 
      created_at: knex.fn.now() 
    },
    { 
      activity_name: 'Drawing', 
      duration: 90, 
      created_at: knex.fn.now() 
    }
    // Add more activity logs as needed
  ];

  // Log the entries to be inserted
  console.log('Entries to be inserted:', entries);

  // Fetch calories_burned from the activities table and insert activity logs
  return knex('activities').select('name', 'calories_burned')
    .then(activities => {
      const entriesWithCalories = entries.map(entry => {
        const activity = activities.find(activity => activity.name === entry.activity_name);
        if (activity) {
          entry.activity_calories_burned = activity.calories_burned;
        }
        return entry;
      });

      // Perform the insertion
      return knex('activities_logs').del()
        .then(function () {
          // Inserts seed entries for activities logs and logs result
          return knex('activities_logs').insert(entriesWithCalories)
            .then(result => {
              console.log('Insert result:', result);
              // Log success and any returned values (like inserted IDs)
              return result;
            });
        });
    })
    .then(() => console.log('Finished activities logs seed file.'));
};
