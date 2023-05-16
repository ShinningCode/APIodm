const express = require('express');
const Column = require('../models/column');
const UserHistory = require('../models/userHistory');

function list(req, res, next) {
    Column.find().then(objs => res.status(200).json({
        message: res.__('ok.column'),
        obj: objs
    })).catch(ex => res.status(500).json({
        message: res.__('bad.column'),
        obj: ex
    }));
}

function index(req, res, next) {
    const id = req.params.id;
    Column.findOne({"_id":id}).then(obj => res.status(200).json({
        message: res.__('ok.column'), 
        obj: obj
    })).catch(ex => res.status(500).json({
        message: res.__('bad.column'),
        obj:ex
    }));
}

async function create(req, res, next) {
    const title = req.body.title;
    const historyId = req.body.historyId;   
     
    let stories = await UserHistory.findOne({"_id":historyId})

    let column = new Column({
        title:title,
        stories:stories,
    });

    column.save().then(obj => res.status(200).json({
        message: res.__('ok.column'),
        obj:obj
    })).catch(ex => res.status(500).json({
        message: res.__('bad.column'),
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
                message: res.__('ok.column'),
                obj: obj
            })).catch(ex => res.status(500).json({
                message: res.__('bad.column'),
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
            message: res.__('ok.column'),
            obj: obj
        })).catch(ex => res.status(500).json({
            message: res.__('bad.column'),
            obj: ex
        }))

}

function destroy(req, res, next) {
    const id = req.params.id;
    Column.findByIdAndRemove({"_id":id})
            .then(obj => res.status(200).json({
                message: res.__('ok.column'),
                obj:obj
            })).catch(ex => res.status(500).json({
                message: res.__('bad.column'),
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