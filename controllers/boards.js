const express = require('express');
const Board = require('../models/board');
const { AbilityBuilder, Ability } = require('@casl/ability');

function defineAbilitiesFor(user) {
  const { can, cannot, build } = new AbilityBuilder(Ability);

  if (user.role === 'admin') {
    can('manage', 'Board');
  } else {
    can('read', 'Board');
    can('create', 'Board');
    can('update', 'Board', { createdBy: user.id });
    can('delete', 'Board', { createdBy: user.id });
  }

  return build();
}

function list(req, res, next) {
  const user = req.user;
  const ability = defineAbilitiesFor(user);

  if (ability.can('read', 'Board')) {
    Board.find()
      .then(objs => res.status(200).json({
        message: res.__('ok.board'),
        obj: objs
      }))
      .catch(ex => res.status(500).json({
        message: res.__('bad.board'),
        obj: ex
      }));
  } else {
    res.status(403).json({
      message: res.__('forbidden'),
      obj: null
    });
  }
}

function index(req, res, next) {
  const user = req.user;
  const ability = defineAbilitiesFor(user);
  const id = req.params.id;

  if (ability.can('read', 'Board')) {
    Board.findOne({ "_id": id })
      .then(obj => res.status(200).json({
        message: res.__('ok.board'),
        obj: obj
      }))
      .catch(ex => res.status(500).json({
        message: res.__('bad.board'),
        obj: ex
      }));
  } else {
    res.status(403).json({
      message: res.__('forbidden'),
      obj: null
    });
  }
}

function create(req, res, next) {
  const user = req.user;
  const ability = defineAbilitiesFor(user);
  const name = req.body.name;
  const columna = req.body.columna;

  if (ability.can('create', 'Board')) {
    const board = new Board({
      name: name,
      columna: columna,
      createdBy: user.id
    });

    board.save()
      .then(obj => res.status(200).json({
        message: res.__('ok.board'),
        obj: obj
      }))
      .catch(ex => res.status(500).json({
        message: res.__('bad.board'),
        ex: ex
      }));
  } else {
    res.status(403).json({
      message: res.__('forbidden'),
      obj: null
    });
  }
}

function replace(req, res, next) {
  const user = req.user;
  const ability = defineAbilitiesFor(user);
  const id = req.params.id;
  const name = req.body.name ? req.body.name : "";
  const columna = req.body.columna ? req.body.columna : "";

  if (ability.can('update', 'Board')) {
    const board = {
      name: name,
      columna: columna
    };

    Board.findOneAndUpdate({ "_id": id }, board, { new: true })
        .then(obj => res.status(200).json({
            message: res.__('ok.board'),
            obj: obj
      }))
        .catch(ex => res.status(500).json({
            message: res.__('bad.board'),
            obj: ex
      }));
  } else {
    res.status(
        403).json({
            message: res.__('forbidden'),
            obj: null});
        }
    }
            
            function update(req, res, next) {
            const user = req.user;
            const ability = defineAbilitiesFor(user);
            const id = req.params.id;
            const name = req.body.name;
            const columna = req.body.columna;
            
            if (ability.can('update', 'Board')) {
            const board = {};
            if (name) board.name = name;
        if (columna) board.columna = columna;

Board.findOneAndUpdate({ "_id": id }, board, { new: true })
  .then(obj => res.status(200).json({
    message: res.__('ok.board'),
    obj: obj
  }))
  .catch(ex => res.status(500).json({
    message: res.__('bad.board'),
    obj: ex
  }));
} else {
    res.status(403).json({
    message: res.__('forbidden'),
    obj: null
    });
    }
    }
    
function destroy(req, res, next) {
    const user = req.user;
    const ability = defineAbilitiesFor(user);
    const id = req.params.id;
    
    if (ability.can('delete', 'Board')) {
        Board.findByIdAndRemove({ "_id": id })
        .then(obj => res.status(200).json({
        //message: res.message: res('ok.board'),
        obj: obj
    })).catch(ex => res.status(500).json({
      //  message: res.('bad.board'),obj: ex
    }));
    } else {
        res.status(403).json({
        message: res.__('forbidden'),
        obj: null
    });
    }
    }
    
    module.exports = {
    list,index,create,replace,update,destroy};