const express = require('express');
const Project = require('../models/proyectRecord');
//const TeamMember = require('../models/teamMember');

function list(req, res, next) {
    Project.find().then(objs => res.status(200).json({
        message: res.__('Project.list'),
        obj: objs
    })).catch(ex => res.status(500).json({
        message: res.__('Project.noInfo'),
        obj: ex
    }));
}

function index(req, res, next) {
    const id = req.params.id;
    Project.findOne({"_id":id}).then(obj => res.status(200).json({
        message: res.__('Project.found'),
        obj: obj
    })).catch(ex => res.status(500).json({
        message: res.__('Project.noFound'),
        obj:ex
    }));
}

async function create(req, res, next) {

    let Name = req.body.Name;
    let requestDate = req.body.requestDate;
    let startDate = req.body.startDate;
    let description = req.body.description;
    let projectManagerId = req.body.projectManagerId;
    let productOwnerId = req.body.productOwnerId;
    let developmentTeam = req.body.developmentTeam;
    let status = req.body.status;


    //let projectManager = await TeamMember.findOne({"_id":projectManagerId});
    //let productOwner = await TeamMember.findOne({"_id":productOwnerId});

    let project = new Project({
      Name:Name, 
      requestDate:requestDate,
      startDate:startDate,
      description:description,
      projectManager: projectManagerId,
      productOwner: productOwnerId,
      developmentTeam: developmentTeam,
      status:status
  });



    project.save().then(obj => res.status(200).json({
        message: res.__('Project.created'),
        obj:obj
    })).catch(ex => res.status(500).json({
        message: res.__('Project.noCreated'),
        ex:ex
    }));
}

function replace(req, res, next) {
    const id = req.params.id;
    let projectName = req.body.projectName ? req.body.projectName : "";
    let applicationDate = req.body.applicationDate ? req.body.applicationDate : "";
    let startUpDate = req.body.startUpDate ? req.body.startUpDate : "";
    let description = req.body.description ? req.body.description : "";
    let projectManagerId = req.body.projectManagerId ? req.body.projectManagerId : "";
    let projectOwnerId = req.body.projectOwnerId ? req.body.projectOwnerId : "";
    let team = req.body.team ? req.body.team : "";
  
    let project = {
      _proyectName: projectName,
      _requestDate: applicationDate,
      _startDate: startUpDate,
      _description: description,
      _proyectManager: projectManagerId,
      _productOwner: projectOwnerId,
      _developmentTeam: team
    };
  
    Project.findOneAndUpdate({ _id: id }, project, { new: true })
      .then(obj => res.status(200).json({
        message: res.__('Project.replaced'),
        obj: obj
      })).catch(ex => res.status(500).json({
        message: res.__('Project.noReplaced'),
        obj: ex
      }));
  }

  function update(req, res, next) {
    const id = req.params.id;
    let projectName = req.body.projectName;
    let applicationDate = req.body.applicationDate;
    let startUpDate = req.body.startUpDate;
    let description = req.body.description;
    let projectManagerId = req.body.projectManagerId;
    let projectOwnerId = req.body.projectOwnerId;
    let team = req.body.team;
  
    let project = new Object;
  
    if (projectName)
      project._proyectName = projectName;
  
    if (applicationDate)
      project._requestDate = applicationDate;
  
    if (startUpDate)
      project._startDate = startUpDate;
  
    if (description)
      project._description = description;
  
    if (projectManagerId)
      project._proyectManager = projectManagerId;
  
    if (projectOwnerId)
      project._productOwner = projectOwnerId;
  
    if (team)
      project._developmentTeam = team;
  
    Project.findOneAndUpdate({ _id: id }, project, { new: true })
      .then(obj => res.status(200).json({
        message: res.__('Project.updated'),
        obj: obj
      })).catch(ex => res.status(500).json({
        message: res.__('Project.noUpdated'),
        obj: ex
      }));
}

function destroy(req, res, next) {
    const id = req.params.id;
    Project.findByIdAndRemove({"_id":id})
            .then(obj => res.status(200).json({
                message: res.__('Project.deleted'),
                obj:obj
            })).catch(ex => res.status(500).json({
                message: res.__('Project.noDeleted'),
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