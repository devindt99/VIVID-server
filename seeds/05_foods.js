require("dotenv").config();

exports.seed = function(knex) {
  console.log('Starting foods seed file...');

  // Define the entries to insert
  const entries = [
    { 
      name: 'Apple', 
      description: 'Apples are a popular fruit known for their crisp texture and sweet flavor.', 
      calories: 95 
    },
    { 
      name: 'Banana', 
      description: 'Bananas are a nutritious fruit packed with essential vitamins and minerals.', 
      calories: 105 
    },
    { 
      name: 'Chicken Breast', 
      description: 'Chicken breast is a lean source of protein that is versatile and easy to cook.', 
      calories: 165 
    },
    { 
      name: 'Brown Rice', 
      description: 'Brown rice is a whole grain that is high in fiber and nutrients, making it a healthy choice.', 
      calories: 216 
    },
    { 
      name: 'Salmon', 
      description: 'Salmon is a fatty fish rich in omega-3 fatty acids, which are beneficial for heart health.', 
      calories: 177 
    }
    // Add more foods as needed
  ];

  // Log the entries to be inserted
  console.log('Entries to be inserted:', entries);

  // Perform the deletion and then insertion
  return knex('foods').del()
    .then(function () {
      // Inserts seed entries and logs result
      return knex('foods').insert(entries)
        .then(result => {
          console.log('Insert result:', result);
          // Log success and any returned values (like inserted IDs)
          return result;
        });
    }).then(() => console.log('Finished foods seed file.'));
};
