require("dotenv").config();

exports.seed = function(knex) {
  console.log('Starting activities seed file...');

  // Define the entries to insert
  const entries = [
    { 
      name: 'Running', 
      description: 'Running is a cardiovascular exercise that involves moving rapidly on foot.', 
      calories_burned: 300 
    },
    { 
      name: 'Cycling', 
      description: 'Cycling is a low-impact exercise that can be done indoors or outdoors on a bicycle.', 
      calories_burned: 250 
    },
    { 
      name: 'Swimming', 
      description: 'Swimming is a full-body workout that improves cardiovascular health and muscular strength.', 
      calories_burned: 400 
    },
    { 
      name: 'Reading', 
      description: 'Reading is a leisure activity that involves absorbing information from written or printed material.', 
      calories_burned: 50 // Reading burns fewer calories compared to physical activities
    },
    { 
      name: 'Drawing', 
      description: 'Drawing is a form of visual expression that involves creating images or designs on paper or other surfaces.', 
      calories_burned: 30 // Drawing burns minimal calories as it's a sedentary activity
    }
    // Add more activities as needed
  ];

  // Log the entries to be inserted
  console.log('Entries to be inserted:', entries);

  // Perform the deletion and then insertion
  return knex('activities').del()
    .then(function () {
      // Inserts seed entries and logs result
      return knex('activities').insert(entries)
        .then(result => {
          console.log('Insert result:', result);
          // Log success and any returned values (like inserted IDs)
          return result;
        });
    }).then(() => console.log('Finished activities seed file.'));
};
