const express = require('express');
const Column = require('../models/column');
const UserHistory = require('../models/userHistory');
const { ability } = require('../permissions'); // Importa la definición de permisos

async function list(req, res, next) {
  const user = req.user; // Obtén el usuario actual desde la solicitud
  const permittedActions = ability.can(user.role).readAny('Column'); // Verifica los permisos del usuario

  if (permittedActions.granted) {
    Column.find()
      .then(objs =>
        res.status(200).json({
          message: res.__('ok.column'),
          obj: objs
        })
      )
      .catch(ex =>
        res.status(500).json({
          message: res.__('bad.column'),
          obj: ex
        })
      );
  } else {
    res.status(403).json({
      message: 'Forbidden',
      obj: null
    });
  }
}

function index(req, res, next) {
  const id = req.params.id;
  Column.findOne({ _id: id })
    .then(obj =>
      res.status(200).json({
        message: res.__('ok.column'),
        obj: obj
      })
    )
    .catch(ex =>
      res.status(500).json({
        message: res.__('bad.column'),
        obj: ex
      })
    );
}

async function create(req, res, next) {
  const user = req.user; // Obtén el usuario actual desde la solicitud
  const permittedActions = ability.can(user.role).createAny('Column'); // Verifica los permisos del usuario

  if (permittedActions.granted) {
    const title = req.body.title;
    const historyId = req.body.historyId;

    let stories = await UserHistory.findOne({ _id: historyId });

    let column = new Column({
      title: title,
      stories: stories
    });

    column
      .save()
      .then(obj =>
        res.status(200).json({
          message: res.__('ok.column'),
          obj: obj
        })
      )
      .catch(ex =>
        res.status(500).json({
          message: res.__('bad.column'),
          ex: ex
        })
      );
  } else {
    res.status(403).json({
      message: 'Forbidden',
      obj: null
    });
  }
}

function replace(req, res, next) {
  const user = req.user; // Obtén el usuario actual desde la solicitud
  const permittedActions = ability.can(user.role).updateAny('Column'); // Verifica los permisos del usuario

  if (permittedActions.granted) {
    const id = req.params.id;
    const historyId = req.body.historyId ? req.body.historyId : '';
    const title = req.body.title ? req.body.title : '';

    let column = new Object({
      _title: title,
      _historyId: historyId
    });

    Column.findOneAndUpdate({ _id: id }, column, { new: true })
      .then(obj =>
        res.status(200).json({
          message: res.__('ok.column'),
          obj: obj
        })
      )
      .catch(ex =>
        res.status(500).json({
          message: res.__('bad.column'),
          obj: ex
        })
      );
  } else {
    res.status(403).json({
      message: 'Forbidden',
      obj: null
    });
  }
}

function update(req, res, next) {
    const user =
    req.user; // Obtén el usuario actual desde la solicitud
    const permittedActions = ability.can(user.role).updateAny('Column'); // Verifica los permisos del usuario
    
    if (permittedActions.granted) {
    const id = req.params.id;
    const historyId = req.params.historyId;
    const title = req.body.title;
    let column = new Object();

    if (description) {
    column._title = title;
    column._historyId = historyId;
}

Column.findOneAndUpdate({ _id: id }, column)
  .then(obj =>
        res.status(200).json({
        message: res.__('ok.column'),
        obj: obj
    })
  )
  .catch(ex =>
        res.status(500).json({
        message: res.__('bad.column'),
        obj: ex
    })
  );
} else {
        res.status(403).json({
        message: 'Forbidden',
        obj: null
    });
    }
    }
    
    function destroy(req, res, next) {
    const user = req.user; // Obtén el usuario actual desde la solicitud
    const permittedActions = ability.can(user.role).deleteAny('Column'); // Verifica los permisos del usuario
        
        if (permittedActions.granted) {
            const id = req.params.id;
            Column.findByIdAndRemove({ _id: id })
                .then(obj =>
                    res.status(200).json({
                    message:('ok.column'),
                    obj: obj
            })
            )
            .catch(ex =>
                res.status(500).json({
                message:('bad.column'),
                obj: ex
            })
            );
            } else {
                res.status(403).json({
                message: 'Forbidden',
                obj: null
            });
            }
    }
    
    module.exports = {
    list,index,create,replace,update,destroy};