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
    const historiesIds = req.body.historiesIds;
    const histories = [];
    
    historiesIds.forEach( async (historyId) => {
        const history = await Backlog.findOne({"_id": historyId});
        if(history){
            histories.push(history);
        }
    });

    let column = new Column({
        title:title,
        histories:histories
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
    const id = req.params.id
    const historiesIds = req.body.historiesIds ? req.body.historyIds: "";
    const title = req.body.title ? req.body.title: "";

    const histories = []
    historiesIds.forEach( async (historyId) => {
        const history = await Backlog.findOne({"_id": historyId});
        if(history){
            histories.push(history);
        }
    });

    let Column = new Object({
        _title: title,
        _histories: histories
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
   let historiesIds = req.body.historiesIds;

   let column = new Object();
   const histories = []
   historiesIds.forEach( async (historyId) => {
       const history = await Backlog.findOne({"_id": historyId});
       if(history){
           histories.push(history);
       }
   });

   if(title){
    column._title = title;
   }
   if(historiesIds){
    column._histories = histories;
   }

    Column.findOneAndUpdate({"_id":id}, column)
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
    column.histories.push(history);
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

    let index = 0;
    //Se comparan los ids del arreglo con el recibido por el body, si coincide se elimina
    for(let i of column.histories){
        if (column.histories[i]._id == historyId){
            index = i;
        }
    }
    try{
        column.histories.splice(index,1);
        column.save().then(obj => res.status(200).json({
            message:res.__('History.deleted'),
            obj:obj
        }))
    }catch{
        err => res.status(500).json({
            message:res.__('History.noDeleted'),
            ex:err
        })
    }


    column.save().then(obj => res.status(200).json({
        message:res.__('History.deleted'),
        obj:obj
    })).catch(err => res.status(500).json({
        message:res.__('History.noDeleted'),
        ex:err
    }));
}

module.exports = { 
    list,
    index,
    create,
    replace,
    update,
    destroy,
    addHistories,
    deleteHistory
};