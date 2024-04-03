const express = require('express');
const router = express.Router();
const feelingsController = require('../controllers/feelings-controller');

router
    .route('/')
    .get(feelingsController.listFeelings)
    .post(feelingsController.addFeeling);



router
    .route("/logs/")
    .get(feelingsController.listFeelingsLogs)
    .post(feelingsController.addFeelingLog);

router
    .route("/logs/:feelings_logs_id")
    .get(feelingsController.findFeelingLogById)
    .put(feelingsController.updateFeelingLog)
    .delete(feelingsController.removeFeelingLog);

router
    .route("/:name")
    .get(feelingsController.findFeelingByName)
    .put(feelingsController.updateFeeling)
    .delete(feelingsController.removeFeeling);

module.exports = router;
