const express = require('express');
const router = express.Router();
const controller = require('../controllers/proyectRecords');
const { authorize } = require('../middlewares/authorization');

router.get('/', authorize('read', 'ProjectRecord'), controller.list);

router.get('/:id', authorize('read', 'ProjectRecord'), controller.index);

router.post('/', authorize('create', 'ProjectRecord'), controller.create);

router.put('/:id', authorize('update', 'ProjectRecord'), controller.replace);

router.patch('/:id', authorize('update', 'ProjectRecord'), controller.update);

router.delete('/:id', authorize('delete', 'ProjectRecord'), controller.destroy);

module.exports = router;
