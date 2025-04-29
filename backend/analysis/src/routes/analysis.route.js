const AnalysisController = require('../controllers/analysis.controller');
const express = require('express');
const router = express.Router();

router.get('/nb_of_observation_points', AnalysisController.nb_of_observation_points);
router.get('/nb_of_observations', AnalysisController.nb_of_observations);
router.get('/valid_quality', AnalysisController.valid_quality);
router.get('/water_quality', AnalysisController.water_quality);
router.get('/map', AnalysisController.Place_data);
router.get('/observe', AnalysisController.getObservationAt);

module.exports = router;