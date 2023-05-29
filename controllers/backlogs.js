const express = require('express');
const Backlog = require('../models/backlogs');
const UserHistory = require('../models/userHistory');

async function getAllBacklog(req, res){
    try{
        const backlogs = await Backlog.find().populate("_histories");
        res.status(200).json(backlogs);
    } catch(err){
        res.status(500).json({
            err: res.__('Backlog.unreachable')
        });
    }
}

async function createBacklog(req,res,next){
    try{
        title = req.body.title
        histories = req.body.historiesIds;
        backLogType = req.body.backLogType;
        const backlogs = new Backlog({title,histories,backLogType});
        const savedBacklogItem = await backlogs.save();
        res.status(201).json(savedBacklogItem);
    } catch(err){
        res.status(500).json({ error: res.__('Backlog.noCreated') });
    }
}



async function updateBacklog(req, res) {
    try {
      const { id } = req.params;
      const { __title, __historiesIds, __BackLogtype  } = req.body;
      __histories = []
      __historiesIds.forEach(async (historyId) => {
          const history = await UserHistory.findOne({"_id":historyId});
          if(history){
            __histories.push(history)
          }    
        }
      )
      const updatedBacklog = await Backlog.findByIdAndUpdate(
          id,
          { __title, __histories, __BackLogtype },
          { new: true }
      );
      
      res.status(200).json(updatedBacklog);
    } catch (error) {
      res.status(500).json({ 
        error: res.__('Backlog.noUpdated')
    });
    }
  }
  async function deleteBacklog(req, res) {
    try {
      const { id } = req.params;
      await BacklogItem.findByIdAndRemove(id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: res.__('Backlog.noDeleted') });
    }
  }
  
  module.exports = {
    getAllBacklog,
    createBacklog,
    updateBacklog,
    deleteBacklog,
  };