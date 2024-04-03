const knex = require("knex")(require("../knexfile.js"));

const listActivities = async (req, res) => {
  try {
    const data = await knex("activities");
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving activities: ${err}`);
  }
};

const findActivityByName = async (req, res) => {
  try {
    const activity = await knex("activities")
      .where("name", req.params.name)
      .first();
    if (!activity) {
      return res.status(404).json({ message: `Activity with name ${req.params.name} not found` });
    }
    res.status(200).json(activity);
  } catch (err) {
    res.status(500).json({ message: `Unable to retrieve activity data: ${err}` });
  }
};

const addActivity = async (req, res) => {
  try {
    const { name, description, calories_burned } = req.body;
    if (!name || !description || !calories_burned) {
      return res.status(400).json({
        message: "Please provide name, description, and calories_burned for the activity.",
      });
    }
    await knex("activities").insert({ name, description, calories_burned });
    const newActivity = { name, description, calories_burned };
    res.status(201).json(newActivity);
  } catch (err) {
    res.status(500).json({ message: `Unable to create new activity: ${err}` });
  }
};


const updateActivity = async (req, res) => {
  try {
    const { description, calories_burned } = req.body;

    // Update the description of the activity in the 'activities' table
    const rowsUpdated = await knex("activities")
      .where({ name: req.params.name })
      .update({ description, calories_burned });

    if (rowsUpdated === 0) {
      return res.status(404).json({ message: `Activity with name ${req.params.name} not found` });
    }

    // Fetch the updated activity
    const updatedActivity = await knex("activities")
      .where({ name: req.params.name })
      .first();

    res.status(200).json(updatedActivity);
  } catch (err) {
    res.status(500).json({ message: `Unable to update activity with name ${req.params.name}: ${err}` });
  }
};

const removeActivity = async (req, res) => {
  try {
    // Delete the activity and cascade delete the associated records in 
    await knex.transaction(async (trx) => {
      // Delete associated records in 
      await trx("activities_logs").where({ activity_name: req.params.name }).delete();
      
      // Delete the activity
      const rowsDeleted = await trx("activities").where({ name: req.params.name }).delete();
      if (rowsDeleted === 0) {
        return res.status(404).json({ message: `Activity with name ${req.params.name} not found` });
      }
    });

    // Send success response
    res.sendStatus(204); // No content to send back for a delete operation
  } catch (err) {
    // Handle errors
    res.status(500).json({ message: `Unable to delete activity: ${err}` });
  }
};

const addActivityLog = async (req, res) => {
  try {
    const { activity_name, duration } = req.body;
    if (!activity_name || !duration) {
      return res.status(400).json({
        message: "Please provide activity_name and duration for the activity log.",
      });
    }
    
    // Fetch activity details from activities table
    const activityDetails = await knex("activities").where({ name: activity_name }).first();
    if (!activityDetails) {
      return res.status(404).json({
        message: `Activity with name '${activity_name}' not found.`,
      });
    }
    
    // Insert activity log with fetched calories burned
    const [newActivityLogId] = await knex("activities_logs").insert({ 
      activity_name, 
      activity_calories_burned: activityDetails.calories_burned, 
      duration 
    });
    
    // Fetch newly inserted activity log
    const newActivityLog = await knex("activities_logs").where({ activities_logs_id: newActivityLogId }).first();
    res.status(201).json(newActivityLog);
  } catch (err) {
    res.status(500).json({ message: `Unable to create new activity log: ${err}` });
  }
};


const listActivityLogs = async (req, res) => {
  try {
    const data = await knex("activities_logs").select("*");
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving activity logs: ${err}`);
  }
};

const findActivityLogById = async (req, res) => {
  try {
    const activityLog = await knex("activities_logs").where({ activities_logs_id: req.params.activities_logs_id }).first();
    if (!activityLog) {
      return res.status(404).json({ message: `Activity log with ID ${req.params.activities_logs_id} not found` });
    }
    res.status(200).json(activityLog);
  } catch (err) {
    res.status(500).json({ message: `Unable to retrieve activity log data: ${err}` });
  }
};

const updateActivityLog = async (req, res) => {
  try {
    const { intensity, duration, created_at } = req.body;
    const rowsUpdated = await knex("activities_logs").where({ activities_logs_id: req.params.activities_logs_id }).update({ intensity, duration, created_at });
    if (rowsUpdated === 0) {
      return res.status(404).json({ message: `Activity log with ID ${req.params.activities_logs_id} not found` });
    }
    const updatedActivityLog = await knex("activities_logs").where({ activities_logs_id: req.params.activities_logs_id }).first();
    res.status(200).json(updatedActivityLog);
  } catch (err) {
    res.status(500).json({ message: `Unable to update activity log with ID ${req.params.activities_logs_id}: ${err}` });
  }
};


const removeActivityLog = async (req, res) => {
  try {
    const rowsDeleted = await knex("activities_logs").where({ activities_logs_id: req.params.activities_logs_id }).delete();
    if (rowsDeleted === 0) {
      return res.status(404).json({ message: `Activity log with ID ${req.params.activities_logs_id} not found` });
    }
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ message: `Unable to delete activity log: ${err}` });
  }
};

const findLogsByActivity = async (req, res) => {
  try {
    const logs = await knex("activities_logs").where({ activity_name: req.params.activity_name });
    res.json(logs); // Send logs back to the client as JSON response
  } catch (err) {
    res.status(500).json({ message: `Unable to find logs with activity name: ${err.message}` });
  }
};



module.exports = {
  listActivities,
  findActivityByName,
  addActivity,
  updateActivity,
  removeActivity,
  addActivityLog,
  listActivityLogs,
  findActivityLogById,
  updateActivityLog,
  removeActivityLog,
  findLogsByActivity,
};
