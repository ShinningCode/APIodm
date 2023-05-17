const express = require('express');
const router = express.Router();
const controller = require('../controllers/backlogs');

router.get('/', controller.getAllBacklog);
router.post('/',controller.createBacklog);
router.patch('/:id',controller.updateBacklog);
router.delete('/:id',controller.deleteBacklog);

module.exports = router;