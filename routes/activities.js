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

router
    .route("/:activity_name/logs")
    .get(activitiesController.findLogsByActivity);

router
    .route("/:activity_name/logs/this_month")
    .get(activitiesController.findSumOfDurationByActivityLast30Days);

router
    .route("/:activity_name/logs/last_month")
    .get(activitiesController.findSumOfDurationByActivityBetween31And60Days);
module.exports = router;
