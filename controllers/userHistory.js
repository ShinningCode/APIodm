const express = require('express');
const Project = require('../models/proyectRecord');

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

function create(req, res, next) {
    let projectName = req.body.projectName;
    let applicationDate = req.body.applicationDate;
    let startUpDate = req.body.startUpDate;
    let description = req.body.description;
    let projectManagerId = req.body.projectManagerId;
    let projectOwnerId = req.body.projectOwnerId;
    let team = req.body.team;

    let project = new Project({
        projectName:projectName, 
        applicationDate:applicationDate,
        startUpDate: startUpDate,
        description: description,
        projectManagerId: projectManagerId,
        projectOwnerId: projectOwnerId,
        team: team
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
    let startUpDate = req.body.startUpDate ? req.body.startUpDate: "";
    let description = req.body.description ? req.body.description: "";
    let projectManagerId = req.body.projectManagerId ? req.body.projectManagerId: "";
    let projectOwnerId = req.body.projectOwnerId ? req.body.projectOwnerId: "";
    let team = req.body.team ? req.body.team: "";

    let project = new Object({
        _projectName: projectName,
        _applicationDate: applicationDate,
        _startUpDate: startUpDate,
        _description: description,
        _projectManagerId: projectManagerId,
        _projectOwnerId: projectOwnerId,
        _team: team
    });
    
    Project.findOneAndUpdate({"_id":id},project,{new : true})
            .then(obj => res.status(200).json({
                message: res.__('Project.replaced'),
                obj: obj
            })).catch(ex => res.status(500).json({
                message: res.__('Project.noReplaced'),
                obj:ex
            }));
}

function update(req, res, next) {
    const id = req.params.id
    let projectName = req.body.projectName;
    let applicationDate = req.body.applicationDate;
    let startUpDate = req.body.startUpDate;
    let description = req.body.description;
    let projectManagerId = req.body.projectManagerId;
    let projectOwnerId = req.body.projectOwnerId;
    let team = req.body.team;

    let project = new Object();

    if(projectName)
        project._projectName = projectName;

    if(applicationDate)
        project._applicationDate = applicationDate;
    
    if(startUpDate)
        project._startUpDate = startUpDate;

    if(description)
        project._description = description;

    if(projectManagerId)
        project._projectMagerId = projectManagerId;
    
    if(projectOwnerId)
        project._projectOwnerId = projectOwnerId;

    if(team)
        project._team = team;

    Project.findOneAndUpdate({"_id":id}, project, {new:true})
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