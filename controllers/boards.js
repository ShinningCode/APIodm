const express = require('express');
const Board = require('../models/board');

function list(req, res, next) {
    Board.find().then(objs => res.status(200).json({
        message: res.__('ok.board'),
        obj: objs
    })).catch(ex => res.status(500).json({
        message: res.__('bad.board'),
        obj: ex
    }));
}

function index(req, res, next) {
    const id = req.params.id;
    Board.findOne({"_id":id}).then(obj => res.status(200).json({
        message: res.__('ok.board'), 
        obj: obj
    })).catch(ex => res.status(500).json({
        message: res.__('bad.board'),
        obj:ex
    }));
}

function create(req, res, next) {
    let name = req.body.name;
    let columna = req.body.columna;

    let board = new Board({
        name: name,
        columna: columna
    });

    board.save().then(obj => res.status(200).json({
        message: res.__('ok.board'),
        obj:obj
    })).catch(ex => res.status(500).json({
        message: res.__('bad.board'),
        ex:ex
    }));
}

function replace(req, res, next) {
    const id = req.params.id;
    let name = req.body.name ? req.body.name : "";
    let columna = req.body.columna ? req.body.columna: "";

    let rol = new Object({
        _name: name,
        _columna: columna
    });
    
    Board.findOneAndUpdate({"_id":id},rol,{new : true})
            .then(obj => res.status(200).json({
                message: res.__('ok.board'),
                obj: obj
            })).catch(ex => res.status(500).json({
                message: res.__('bad.board'),
                obj:ex
            }));
}

function update(req, res, next) {
   const id = req.params.id;
   let name = req.body.name;
   let columna = req.body.columna;

   let board = new Object();

   if(name)
       board._name = name;

    if(columna)
        board._columna = columna

    Board.findOneAndUpdate({"_id":id}, user, {new:true})
        .then(obj => res.status(200).json({
            message: res.__('ok.board'),
            obj: obj
        })).catch(ex => res.status(500).json({
            message: res.__('bad.board'),
            obj: ex
        }))

}

function destroy(req, res, next) {
    const id = req.params.id;
    Board.findByIdAndRemove({"_id":id})
            .then(obj => res.status(200).json({
                message: res.__('ok.board'),
                obj:obj
            })).catch(ex => res.status(500).json({
                message: res.__('bad.board'),
                obj:ex
            }));
}

module.exports = { 
    list,
    index,
    create,
    replace,
    update,
    destroy
};