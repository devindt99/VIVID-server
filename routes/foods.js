const express = require('express');
const router = express.Router();
const foodsController = require('../controllers/foods-controller');

router
    .route('/')
    .get(foodsController.listFoods)
    .post(foodsController.addFood);

router
    .route("/logs/")
    .get(foodsController.listFoodLogs)
    .post(foodsController.addFoodLog);

router
    .route("/logs/:foods_logs_id")
    .get(foodsController.findFoodLogById)
    .put(foodsController.updateFoodLog)
    .delete(foodsController.removeFoodLog);

router
    .route("/:name")
    .get(foodsController.findFoodByName)
    .put(foodsController.updateFood)
    .delete(foodsController.removeFood);
router
    .route("/:food_name/logs")
    .get(foodsController.findLogsByFood);

module.exports = router;
