const express = require('express');
const Column = require('../models/column');
const Backlog = require('../models/backlogs');

function list(req, res, next) {
    Column.find().then(objs => res.status(200).json({
        message: res.__('Column.list'),
        obj: objs
    })).catch(ex => res.status(500).json({
        message: res.__('Column.noInfo'),
        obj: ex
    }));
}

function index(req, res, next) {
    const id = req.params.id;
    Column.findOne({"_id":id}).then(obj => res.status(200).json({
        message: res.__('Column.found'), 
        obj: obj
    })).catch(ex => res.status(500).json({
        message: res.__('Column.noFound'),
        obj:ex
    }));
}


async function create(req, res, next){
    const title = req.body.title;
    const historyId = req.body.historyId;
    const histories = [];
    let history = await Backlog.findOne({"_id": historyId});

    histories.push(history);

    let column = new Column({
        title:title,
        stories:histories
    });

    column.save().then(obj => res.status(200).json({
        message: res.__('Column.created'),
        obj:obj
    })).catch(ex => res.status(500).json({
        message: res.__('Column.noCreated'),
        ex:ex
    }));
}

function replace(req, res, next) {
    const historyId = req.body.historyId ? req.body.historyId: "";
    const title = req.body.title ? req.body.title: "";

    let Column = new Object({
        _title: title,
        _historyId: historyId
    });
    
    Column.findOneAndUpdate({"_id":id},Column,{new : true})
            .then(obj => res.status(200).json({
                message: res.__('Column.replaced'),
                obj: obj
            })).catch(ex => res.status(500).json({
                message: res.__('Column.noReplaced'),
                obj:ex
            }));
}

function update(req, res, next) {
   const historyId = req.params.historyId;
   let title = req.body.title;

   let Column = new Object();

   if(description){
    Column._title = title;
    Column._historyId = historyId;
   }

    Column.findOneAndUpdate({"_id":id}, Column)
        .then(obj => res.status(200).json({
            message: res.__('Column.updated'),
            obj: obj
        })).catch(ex => res.status(500).json({
            message: res.__('Column.noUpdated'),
            obj: ex
        }))

}

function destroy(req, res, next) {
    const id = req.params.id;
    Column.findByIdAndRemove({"_id":id})
            .then(obj => res.status(200).json({
                message: res.__('Column.deleted'),
                obj:obj
            })).catch(ex => res.status(500).json({
                message: res.__('Column.noDeleted'),
                obj:ex
            }));
}

async function addHistories(req, res, next){
    let columnId = req.body.columnId;
    let historyId = req.body.historyId;

    let column = await Column.findOne({"_id": columnId});
    let history = await History.findOne({"_id": historyId});
    column.stories.push(history);
    column.save().then(obj => res.status(200).json({
        message:'History.added',
        obj:obj
    })).catch(err => res.status(500).json({
        message:'History.noAdded',
        ex:err
    }));

}

async function deleteHistory(req, res, next){
    let columnId = req.body.columnId;
    let historyId = req.body.historyId;

    let column = await Column.findOne({"_id": columnId});
    let history = await History.findOne({"_id": historyId});

    let index = 0;
    //Se comparan los ids del arreglo con el recibido por el body, si coincide se elimina
    for(let i of column.stories){
        if (column.stories[i]._id == historyId){
            index = i;
        }
    }
    try{
        column.stories.splice(index,1);
        column.save().then(obj => res.status(200).json({
            message:'History.deleted',
            obj:obj
        }))
    }catch{
        err => res.status(500).json({
            message:'History.noDeleted',
            ex:err
        })
    }


    column.save().then(obj => res.status(200).json({
        message:'History.deleted',
        obj:obj
    })).catch(err => res.status(500).json({
        message:'History.noDeleted',
        ex:err
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