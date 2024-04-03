const express = require('express');
const router = express.Router();
const activitiesController = require('../controllers/activities-controller');

router
    .route('/')
    .get(activitiesController.listActivities)
    .post(activitiesController.addActivity);

router
    .route("/logs/")
    .get(activitiesController.listActivityLogs)
    .post(activitiesController.addActivityLog);

router
    .route("/logs/:activities_logs_id")
    .get(activitiesController.findActivityLogById)
    .put(activitiesController.updateActivityLog)
    .delete(activitiesController.removeActivityLog);

router
    .route("/:name")
    .get(activitiesController.findActivityByName)
    .put(activitiesController.updateActivity)
    .delete(activitiesController.removeActivity);

module.exports = router;
