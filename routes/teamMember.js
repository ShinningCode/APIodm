const express = require('express');
const router = express.Router();
const controller = require('../controllers/teamMembers');

/* GET users listing. */
router.get('/',controller.list);
router.get('/:id',controller.index);
router.post('/',controller.create);
router.delete('/:id',controller.destroy);
router.patch('/:id',controller.update);

module.exports = router;
