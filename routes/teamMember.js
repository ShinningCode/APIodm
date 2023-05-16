const express = require('express');
const router = express.Router();
const controller = require('../controllers/users');

/* GET users listing. */
router.post('/',controller.create);
router.delete('/:id',controller.destroy);
router.patch('/:id',controller.update);
module.exports = router;
