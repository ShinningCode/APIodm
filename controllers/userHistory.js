const express = require('express');
const UserHistory = require('../models/userHistory');


function list(req, res, next) {
    UserHistory.find().then(objs => res.status(200).json({
        message: res.__('user.list'),
        obj: objs
    })).catch(ex => res.status(500).json({
        message: res.__('user.noInfo'),
        obj: ex
    }));
}

function index(req,res,next){
    const id = req.params.id;
    UserHistory.findOne({"id":id}).then(obj => res.stauts(200).json({
        message:res.__('History.found'),
        obj:obj
    })).catch(ex => res.status(500).json({
        message: res.__('History.noFound'),
        obj:ex
    }));
}

function create(req,res,next){
    let name     = req.body.name
    let context  = req.body.context
    let rol      = req.body.rol
    let benefit  = req.body.benefit
    let priority = req.body.priority
    let size     = req.body.size
    let event    = req.body.event
    let result   = req.body.result
    let status   = req.body.status
    let column   = req.body.column    

    let userHistory = new UserHistory({
        name:name,
        context:context,
        rol:rol,
        benefit:benefit,
        priority:priority,
        size:size,
        event:event,
        result:result,
        status:status,
        column:column
    })

    userHistory.save().then(obj => res.status(200).json({
        message: res.__("History.create"),
        obj: obj
        })).catch(ex => res.status(500).json({
            message: res.__("History.notcreate"),
            obj: ex
        }));
}

function replace(req,res,next){
    const id = req.params.id;
    let name     = req.body.name     ?req.body.name :"";
    let context  = req.body.context  ?req.body.context:"";
    let rol      = req.body.rol      ?req.body.rol :"";
    let benefit  = req.body.benefit  ?req.body.benefit :"";
    let priority = req.body.priority ?req.body.piority:"";
    let size     = req.body.size     ?req.body.size  :"";
    let event    = req.body.event    ?req.body.event  :"";
    let result   = req.body.result   ?req.body.result :"";
    let status   = req.body.status   ?req.body.status:"";
    let column   = req.body.column   ?req.body.colum :"";

    let userHistory = new Object({
        _name:name,
        _context:context,
        _rol:rol,
        _benefit:benefit,
        _priority:priority,
        _size:size,
        _event:event,
        _resutl:result,
        _status:status,
        _column:column
    })
    UserHistory.findOneAndUpdate({"_id":id},userHistory,{new:true})
               .then(obj => res.status(200).json({
                message:res__('History.replaced'),
                obj:obj
               })).catch(ex => res.status(500).json({
                message:res.__('History.noReplaced'),
                obj:ex
               }))
}

function update(req, res, next) {
    const id = req.params.id;
    let name = req.body.name;
    let context = req.body.context;
    let rol = req.body.rol;
    let benefit = req.body.benefit;
    let priority = req.body.priority;
    let size = req.body.size;
    let event = req.body.event;
    let result = req.body.result;
    let status = req.body.status;
    let column = req.body.column;
  
    let userHistory = new Object;
  
    if (name)
      userHistory._name = name;
  
    if (context)
      userHistory._context = context;
  
    if (rol)
      userHistory._rol = rol;
  
    if (benefit)
      userHistory._benefit = benefit;
  
    if (priority)
      userHistory._priority = priority;
  
    if (size)
      userHistory._size = size;
  
    if (event)
      userHistory._event = event;
  
    if (result)
      userHistory._result = result;
  
    if (status)
      userHistory._status = status;
  
    if (column)
      userHistory._column = column;
  
    UserHistory.findOneAndUpdate({ "_id": id }, userHistory, { new: true })
      .then(obj => res.status(200).json({
        message: res.__('History.replaced'),
        obj: obj
      })).catch(ex => res.status(500).json({
        message: res.__('History.noReplaced'),
        obj: ex
      }));
 
}

function destroy(req,params,next){
    const id = req.params.id;
    UserHistory.findByIdAndRemove({"_id":id})
        .then(obj => res.status(200).json({
        message: res.__('History.deleted'),
        obj:obj
    })).catch(ex => res.status(500).json({
        message: res.__('History.noDeleted'),
        obj:ex
    }));               
}

module.exports =  {
    list,
    index,
    create,
    update,
    replace,
    destroy
}