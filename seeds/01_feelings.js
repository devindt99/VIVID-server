require("dotenv").config();

exports.seed = function(knex) {
  console.log('Starting feelings seed file...');

  // Define the entries to insert
  const entries = [
    { name: 'Happiness', description: 'A state of well-being and contentment characterized by positive emotions.' },
    { name: 'Sadness', description: 'A deep, emotional pain characterized by feelings of loss, despair, and disappointment.' },
    { name: 'Anger', description: 'A strong feeling of annoyance, displeasure, or hostility.' },
    { name: 'Fear', description: 'An unpleasant emotion caused by the belief that someone or something is dangerous, likely to cause pain, or a threat.' },
    { name: 'Surprise', description: 'A sudden and unexpected event or piece of information.' },
    { name: 'Disgust', description: 'A feeling of revulsion or profound disapproval aroused by something unpleasant or offensive.' },
    { name: 'Trust', description: 'Firm belief in the reliability, truth, ability, or strength of someone or something.' },
    { name: 'Anticipation', description: 'The action of anticipating something; expectation or prediction.' },
    { name: 'Joy', description: 'A feeling of great pleasure and happiness.' },
    { name: 'Love', description: 'An intense feeling of deep affection.' }
  ];

  // Log the entries to be inserted
  console.log('Entries to be inserted:', entries);

  // Perform the deletion and then insertion
  return knex('feelings').del()
    .then(function () {
      // Inserts seed entries and logs result
      return knex('feelings').insert(entries)
        .then(result => {
          console.log('Insert result:', result);
          // Log success and any returned values (like inserted IDs)
          return result;
        });
    }).then(() => console.log('Finished feelings seed file.'));
};
