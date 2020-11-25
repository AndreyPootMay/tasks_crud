const express = require('express');
const router = express.Router();

const controller = require('../controllers/tasksController');

router.get('/tasks', controller.findAll);
router.get('/task/:id', controller.findOne);
router.post('/tasks', controller.insert);

router.put('/task/:id', controller.update);
router.delete('/task/:id', controller.delete);

module.exports = router;