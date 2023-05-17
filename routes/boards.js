const express = require('express');
const router = express.Router();
const controller = require('../controllers/boards');
const { ability } = require('../permissions'); // Importa la definición de permisos

router.get('/', (req, res, next) => {
  const user = req.user; // Obtén el usuario actual desde la solicitud
  const permittedActions = ability.can(user.role).readAny('Board'); // Verifica los permisos del usuario

  if (permittedActions.granted) {
    controller.list(req, res, next);
  } else {
    res.status(403).json({
      message: 'Forbidden',
      obj: null
    });
  }
});

router.get('/:id', controller.index);

router.post('/', (req, res, next) => {
  const user = req.user; // Obtén el usuario actual desde la solicitud
  const permittedActions = ability.can(user.role).createAny('Board'); // Verifica los permisos del usuario

  if (permittedActions.granted) {
    controller.create(req, res, next);
  } else {
    res.status(403).json({
      message: 'Forbidden',
      obj: null
    });
  }
});

router.put('/:id', (req, res, next) => {
  const user = req.user; // Obtén el usuario actual desde la solicitud
  const permittedActions = ability.can(user.role).updateAny('Board'); // Verifica los permisos del usuario

  if (permittedActions.granted) {
    controller.replace(req, res, next);
  } else {
    res.status(403).json({
      message: 'Forbidden',
      obj: null
    });
  }
});

router.patch('/:id', (req, res, next) => {
  const user = req.user; // Obtén el usuario actual desde la solicitud
  const permittedActions = ability.can(user.role).updateAny('Board'); // Verifica los permisos del usuario

  if (permittedActions.granted) {
    controller.update(req, res, next);
  } else {
    res.status(403).json({
      message: 'Forbidden',
      obj: null
    });
  }
});

router.delete('/:id', (req, res, next) => {
  const user = req.user; // Obtén el usuario actual desde la solicitud
  const permittedActions = ability.can(user.role).deleteAny('Board'); // Verifica los permisos del usuario

  if (permittedActions.granted) {
    controller.destroy(req, res, next);
  } else {
    res.status(403).json({
      message: 'Forbidden',
      obj: null
    });
  }
});

module.exports = router;
