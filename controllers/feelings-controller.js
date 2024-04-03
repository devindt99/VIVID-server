const knex = require("knex")(require("../knexfile.js"));

const listFeelings = async (req, res) => {
  try {
    const data = await knex("feelings");
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving feelings: ${err}`);
  }
};

const findFeelingByName = async (req, res) => {
  try {
    const feeling = await knex("feelings")
      .where("name", req.params.name)
      .first();
    if (!feeling) {
      return res.status(404).json({ message: `Feeling with name ${req.params.name} not found` });
    }
    res.status(200).json(feeling);
  } catch (err) {
    res.status(500).json({ message: `Unable to retrieve feeling data: ${err}` });
  }
};

const addFeeling = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({
        message: "Please provide name and description for the feeling.",
      });
    }
    await knex("feelings").insert({ name, description });
    const newFeeling = { name, description };
    res.status(201).json(newFeeling);
  } catch (err) {
    res.status(500).json({ message: `Unable to create new feeling: ${err}` });
  }
};

const updateFeeling = async (req, res) => {
  try {
    const { description, intensity } = req.body;

    // Update the feeling in the 'feelings' table
    const rowsUpdated = await knex('feelings')
      .where({ name: req.params.name })
      .update({ description, intensity });

    if (rowsUpdated === 0) {
      return res.status(404).json({ message: `Feeling with name ${req.params.name} not found` });
    }

    // Fetch the updated feeling
    const updatedFeeling = await knex('feelings')
      .where({ name: req.params.name })
      .first();

    res.status(200).json(updatedFeeling);
  } catch (err) {
    res.status(500).json({ message: `Unable to update feeling with name ${req.params.name}: ${err}` });
  }
};

const removeFeeling = async (req, res) => {
  try {
    // Delete the feeling and cascade delete the associated records in feelings_logs
    await knex.transaction(async (trx) => {
      // Delete associated records in feelings_logs
      await trx("feelings_logs").where({ feeling_name: req.params.name }).delete();
      
      // Delete the feeling
      const rowsDeleted = await trx("feelings").where({ name: req.params.name }).delete();
      if (rowsDeleted === 0) {
        return res.status(404).json({ message: `Feeling with name ${req.params.name} not found` });
      }
    });

    // Send success response
    res.sendStatus(204); // No content to send back for a delete operation
  } catch (err) {
    // Handle errors
    res.status(500).json({ message: `Unable to delete feeling: ${err}` });
  }
};

const addFeelingLog = async (req, res) => {
  try {
    const { feeling_name, intensity, duration } = req.body;
    if (!feeling_name || intensity === undefined || !duration) {
      return res.status(400).json({
        message: "Please provide feeling_name, intensity, and duration for the feeling log.",
      });
    }
    const [newFeelingLogId] = await knex("feelings_logs").insert({ feeling_name, intensity, duration });
    const newFeelingLog = await knex("feelings_logs").where({ feeling_name }).first();
    res.status(201).json(newFeelingLog);
  } catch (err) {
    res.status(500).json({ message: `Unable to create new feeling log: ${err}` });
  }
};

const listFeelingsLogs = async (req, res) => {
  try {
    const data = await knex("feelings_logs").select("*");
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving feelings logs: ${err}`);
  }
};

const findFeelingLogById = async (req, res) => {
  try {
    const feelingLog = await knex("feelings_logs").where({ feelings_logs_id: req.params.id }).first();
    if (!feelingLog) {
      return res.status(404).json({ message: `Feeling log with ID ${req.params.id} not found` });
    }
    res.status(200).json(feelingLog);
  } catch (err) {
    res.status(500).json({ message: `Unable to retrieve feeling log data: ${err}` });
  }
};

const updateFeelingLog = async (req, res) => {
  try {
    const { intensity, duration, created_at } = req.body;
    const rowsUpdated = await knex("feelings_logs").where({ feelings_logs_id: req.params.feelings_logs_id }).update({ intensity, duration, created_at });
    if (rowsUpdated === 0) {
      return res.status(404).json({ message: `Feeling log with ID ${req.params.feelings_logs_id} not found` });
    }
    const updatedFeelingLog = await knex("feelings_logs").where({ feelings_logs_id: req.params.feelings_logs_id }).first();
    res.status(200).json(updatedFeelingLog);
  } catch (err) {
    res.status(500).json({ message: `Unable to update feeling log with ID ${req.params.feelings_logs_id}: ${err}` });
  }
};

const removeFeelingLog = async (req, res) => {
  try {
    const rowsDeleted = await knex("feelings_logs").where({ id: req.params.id }).delete();
    if (rowsDeleted === 0) {
      return res.status(404).json({ message: `Feeling log with ID ${req.params.id} not found` });
    }
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ message: `Unable to delete feeling log: ${err}` });
  }
};
const findLogsByFeeling = async (req, res) => {
  try {
    const logs = await knex("feelings_logs").where({ feeling_name: req.params.feeling_name });
    res.json(logs); // Send logs back to the client as JSON response
  } catch (err) {
    res.status(500).json({ message: `Unable to find logs with feeling name: ${err.message}` });
  }
};


module.exports = {
  listFeelings,
  findFeelingByName,
  addFeeling,
  updateFeeling,
  removeFeeling,
  addFeelingLog,
  listFeelingsLogs,
  findFeelingLogById,
  updateFeelingLog,
  removeFeelingLog,
  findLogsByFeeling,
};
