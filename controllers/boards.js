const express = require('express');
const Board = require('../models/board');
const Columns = require('../models/column');

function list(req, res, next) {
    Board.find().then(objs => res.status(200).json({
        message: res.__('Board.list'),
        obj: objs
    })).catch(ex => res.status(500).json({
        message: res.__('Board.noInfo'),
        obj: ex
    }));
}

function index(req, res, next) {
    const id = req.params.id;
    Board.findOne({"_id":id}).then(obj => res.status(200).json({
        message: res.__('Board.found'), 
        obj: obj
    })).catch(ex => res.status(500).json({
        message: res.__('Board.noFound'),
        obj:ex
    }));
}

async function create(req, res, next) {
    let name = req.body.name;
    let columnsIds = req.body.columnsIds;
    columns = []

    columnsIds.forEach(async (columnId) => {
        const column = await Columns.findOne({"_id":columnId});
        if(column){
            columns.push(column);
        }
    });

    let board = new Board({
        name:name,
        columns:columns
    });

    board.save().then(obj => res.status(200).json({
        message: res.__('Board.created'),
        obj:obj
    })).catch(ex => res.status(500).json({
        message: res.__('Board.noCreated'),
        ex:ex
    }));
}

function replace(req, res, next) {
    const id = req.params.id;
    let name = req.body.name ? req.body.name : "";
    let columnsIds = req.body.columnsIds ? req.body.columnsIds: "";

    const columns = []
    columnsIds.forEach(async (columnId) => {
        const column = await Columns.findOne({"_id":columnId});
        if(column){
            columns.push(column);
        }
    });

    let rol = new Object({
        _name: name,
        _columns: columns
    });
    
    Board.findOneAndUpdate({"_id":id},rol,{new : true})
            .then(obj => res.status(200).json({
                message: res.__('Board.replaced'),
                obj: obj
            })).catch(ex => res.status(500).json({
                message: res.__('Board.noReplaced'),
                obj:ex
            }));
}

function update(req, res, next) {
   const id = req.params.id;
   let name = req.body.name;
   let columnsIds = req.body.columnsIds;
   const columns = []
   columnsIds.forEach(async (columnId) => {
       const column = await Columns.findOne({"_id":columnId});
       if(column){
           columns.push(column);
       }
   });


   let board = new Object();

   if(name)
       board._name = name;

    if(columns)
        board._columns = columns

    Board.findOneAndUpdate({"_id":id}, board, {new:true})
        .then(obj => res.status(200).json({
            message: res.__('Board.updated'),
            obj: obj
        })).catch(ex => res.status(500).json({
            message: res.__('Board.noUpdated'),
            obj: ex
        }))

}

function destroy(req, res, next) {
    const id = req.params.id;
    Board.findByIdAndRemove({"_id":id})
            .then(obj => res.status(200).json({
                message: res.__('Board.deleted'),
                obj:obj
            })).catch(ex => res.status(500).json({
                message: res.__('Board.noDeleted'),
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