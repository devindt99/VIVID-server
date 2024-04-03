const knex = require("knex")(require("../knexfile.js"));

const listFoods = async (req, res) => {
  try {
    const data = await knex("foods");
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving foods: ${err}`);
  }
};

const findFoodByName = async (req, res) => {
  try {
    const food = await knex("foods")
      .where("name", req.params.name)
      .first();
    if (!food) {
      return res.status(404).json({ message: `Food with name ${req.params.name} not found` });
    }
    res.status(200).json(food);
  } catch (err) {
    res.status(500).json({ message: `Unable to retrieve food data: ${err}` });
  }
};

const addFood = async (req, res) => {
  try {
    const { name, description, calories } = req.body;
    if (!name || !calories) {
      return res.status(400).json({
        message: "Please provide name and calories for the food.",
      });
    }
    await knex("foods").insert({ name, description, calories });
    const newFood = { name, description, calories };
    res.status(201).json(newFood);
  } catch (err) {
    res.status(500).json({ message: `Unable to create new food: ${err}` });
  }
};

const updateFood = async (req, res) => {
  try {
    const { description, calories } = req.body;

    // Update the description and calories of the food in the 'foods' table
    const rowsUpdated = await knex("foods")
      .where({ name: req.params.name })
      .update({ description, calories });

    if (rowsUpdated === 0) {
      return res.status(404).json({ message: `Food with name ${req.params.name} not found` });
    }

    // Fetch the updated food
    const updatedFood = await knex("foods")
      .where({ name: req.params.name })
      .first();

    res.status(200).json(updatedFood);
  } catch (err) {
    res.status(500).json({ message: `Unable to update food with name ${req.params.name}: ${err}` });
  }
};

const removeFood = async (req, res) => {
  try {
    // Delete the food and cascade delete the associated records in foods_logs
    await knex.transaction(async (trx) => {
      // Delete associated records in foods_logs
      await trx("foods_logs").where({ food_name: req.params.name }).delete();
      
      // Delete the food
      const rowsDeleted = await trx("foods").where({ name: req.params.name }).delete();
      if (rowsDeleted === 0) {
        return res.status(404).json({ message: `Food with name ${req.params.name} not found` });
      }
    });

    // Send success response
    res.sendStatus(204); // No content to send back for a delete operation
  } catch (err) {
    // Handle errors
    res.status(500).json({ message: `Unable to delete food: ${err}` });
  }
};
const addFoodLog = async (req, res) => {
    try {
      const { food_name, quantity } = req.body;
      if (!food_name || !quantity) {
        return res.status(400).json({
          message: "Please provide food_name and quantity for the food log.",
        });
      }
      const food = await knex("foods").where({ name: food_name }).first();
      if (!food) {
        return res.status(404).json({
          message: "Food not found.",
        });
      }
      const food_calories = food.calories;
      const [newFoodLogId] = await knex("foods_logs").insert({ food_name, food_calories, quantity });
      const newFoodLog = await knex("foods_logs").where({ foods_logs_id: newFoodLogId }).first();
      res.status(201).json(newFoodLog);
    } catch (err) {
      res.status(500).json({ message: `Unable to create new food log: ${err}` });
    }
  };
  
  

const listFoodLogs = async (req, res) => {
  try {
    const data = await knex("foods_logs").select("*");
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving food logs: ${err}`);
  }
};

const findFoodLogById = async (req, res) => {
  try {
    const foodLog = await knex("foods_logs").where({ foods_logs_id: req.params.foods_logs_id }).first();
    if (!foodLog) {
      return res.status(404).json({ message: `Food log with ID ${req.params.foods_logs_id} not found` });
    }
    res.status(200).json(foodLog);
  } catch (err) {
    res.status(500).json({ message: `Unable to retrieve food log data: ${err}` });
  }
};
const updateFoodLog = async (req, res) => {
    try {
      const { food_name, quantity } = req.body;
      const updatedFields = { food_name, quantity }; // Updated fields
      const rowsUpdated = await knex("foods_logs").where({ foods_logs_id: req.params.foods_logs_id }).update(updatedFields);
      if (rowsUpdated === 0) {
        return res.status(404).json({ message: `Food log with ID ${req.params.foods_logs_id} not found` });
      }
      const updatedFoodLog = await knex("foods_logs").where({ foods_logs_id: req.params.foods_logs_id }).first();
      res.status(200).json(updatedFoodLog);
    } catch (err) {
      res.status(500).json({ message: `Unable to update food log with ID ${req.params.foods_logs_id}: ${err}` });
    }
  };
  

const removeFoodLog = async (req, res) => {
  try {
    const rowsDeleted = await knex("foods_logs").where({ foods_logs_id: req.params.foods_logs_id }).delete();
    if (rowsDeleted === 0) {
      return res.status(404).json({ message: `Food log with ID ${req.params.foods_logs_id} not found` });
    }
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ message: `Unable to delete food log: ${err}` });
  }
};



module.exports = {
  listFoods,
  findFoodByName,
  addFood,
  updateFood,
  removeFood,
  addFoodLog,
  listFoodLogs,
  findFoodLogById,
  updateFoodLog,
  removeFoodLog,
};
