const express = require('express');
const Backlog = require('../models/backlogs');

async function getAllBacklog(req, res){
    try{
        const backlogs = await Backlog.find();
        res.status(200).json(backlogs);
    } catch(err){
        res.status(500).json({
            err: 'Error al generar el backlog del Proyecto'
        });
    }
}

async function createBacklog(req,res){
    try{
        const { __title, __histories, __BackLogtype } = req.body;
        const backlogs = new Backlog({ __title, __histories, __BackLogtype  });
        const savedBacklogItem = await backlogs.save();
        res.status(201).json(savedBacklogItem);
    } catch(err){
        res.status(500).json({ error: 'Error al crear un elemento del backlog' });
    }
}

async function updateBacklog(req, res) {
    try {
      const { id } = req.params;
      const { __title, __histories, __BackLogtype  } = req.body;
      const updatedBacklog = await Backlog.findByIdAndUpdate(
          id,
          { __title, __histories, __BackLogtype },
          { new: true }
      );
      
      res.status(200).json(updatedBacklog);
    } catch (error) {
      res.status(500).json({ 
        error: 'Error al actualizar un elemento del backlog'
    });
    }
  }
  async function deleteBacklog(req, res) {
    try {
      const { id } = req.params;
      await BacklogItem.findByIdAndRemove(id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar un elemento del backlog' });
    }
  }
  
  module.exports = {
    getAllBacklog,
    createBacklog,
    updateBacklog,
    deleteBacklog,
  };