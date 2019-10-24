const express = require('express');
const router = express.Router();

const controller = require('../controller');

router.post("/heatmap", controller.heatMapController);

router.post("/boundary", controller.boundaryController)

module.exports = router;