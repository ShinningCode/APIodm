const express = require('express');
const router = express.Router();
const controller = require('../controllers/teamMembers');
const { can } = require('../middlewares/casl');

/* POST create team member */
router.post('/', can('create', 'TeamMember'), controller.create);

/* DELETE delete team member by ID */
router.delete('/:id', can('delete', 'TeamMember'), controller.destroy);

/* PATCH update team member by ID */
router.patch('/:id', can('update', 'TeamMember'), controller.update);

module.exports = router;
