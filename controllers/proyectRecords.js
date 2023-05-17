const express = require('express');
const { AbilityBuilder, Ability } = require('@casl/ability');
const Project = require('../models/projectRecord');
const { ForbiddenError } = require('../utils/errors');

async function list(req, res, next) {
  try {
    const projects = await Project.find();
    res.status(200).json({
      message: res.__('ok.project'),
      obj: projects
    });
  } catch (error) {
    res.status(500).json({
      message: res.__('bad.project'),
      obj: error
    });
  }
}

async function index(req, res, next) {
  const id = req.params.id;
  try {
    const project = await Project.findOne({ "_id": id });
    if (!project) {
      throw new Error('Project not found');
    }
    res.status(200).json({
      message: res.__('ok.project'),
      obj: project
    });
  } catch (error) {
    res.status(500).json({
      message: res.__('bad.project'),
      obj: error
    });
  }
}

async function create(req, res, next) {
  const projectName = req.body.projectName;
  const applicationDate = req.body.applicationDate;
  const startUpDate = req.body.startUpDate;
  const description = req.body.description;
  const projectManagerId = req.body.projectManagerId;
  const projectOwnerId = req.body.projectOwnerId;
  const team = req.body.team;

  try {
    const project = new Project({
      projectName: projectName,
      applicationDate: applicationDate,
      startUpDate: startUpDate,
      description: description,
      projectManagerId: projectManagerId,
      projectOwnerId: projectOwnerId,
      team: team
    });

    const savedProject = await project.save();
    res.status(200).json({
      message: res.__('ok.project'),
      obj: savedProject
    });
  } catch (error) {
    res.status(500).json({
      message: res.__('bad.project'),
      obj: error
    });
  }
}

async function replace(req, res, next) {
  const id = req.params.id;
  const projectName = req.body.projectName ? req.body.projectName : "";
  const applicationDate = req.body.applicationDate ? req.body.applicationDate : "";
  const startUpDate = req.body.startUpDate ? req.body.startUpDate : "";
  const description = req.body.description ? req.body.description : "";
  const projectManagerId = req.body.projectManagerId ? req.body.projectManagerId : "";
  const projectOwnerId = req.body.projectOwnerId ? req.body.projectOwnerId : "";
  const team = req.body.team ? req.body.team : "";

  try {
    const project = await Project.findOneAndUpdate({ "_id": id }, {
      projectName: projectName,
      applicationDate: applicationDate,
      startUpDate: startUpDate,
      description: description,
      projectManagerId: projectManagerId,
      projectOwnerId: projectOwnerId,
      team: team
    }, { new: true });

    if (!project) {
      throw new Error('Project not found');
    }

    res.status(200).json({
      message: res.__('ok.project'),
      obj: project
    });
  } catch (error) {
    res.status(500).json({
      message: res.__('bad.project'),
      obj: error
    });
  }
}

async function update(req, res, next) {
  const id = req.params.id;
  const projectName = req.body.projectName;
  const applicationDate = req.body.applicationDate;
  const startUpDate = req.body.startUpDate;
  const description = req.body.description;
  const projectManagerId = req.body.projectManagerId;
  const projectOwnerId = req.body.projectOwnerId;
  const team = req.body.team;
  
  try {
  const project = await Project.findOne({ "_id": id });
  if (!project) {
        throw new Error('Project not found');
  }
  
        project.projectName = projectName || project.projectName;
        project.applicationDate = applicationDate || project.applicationDate;
        project.startUpDate = startUpDate || project.startUpDate;
        project.description = description || project.description;
        project.projectManagerId = projectManagerId || project.projectManagerId;
        project.projectOwnerId = projectOwnerId || project.projectOwnerId;
        project.team = team || project.team;
        
        const updatedProject = await project.save();
        res.status(200).json({
            message: res.__('ok.project'),
            obj: updatedProject
  });
} catch (error) {
    res.status(500).json({
    message: res.__('bad.project'),
    obj: error
    });
    }
    }
    
    async function destroy(req, res, next) {
    const id = req.params.id;
    try {
    const project = await Project.findByIdAndRemove({ "_id": id });
    if (!project) {
    throw new Error('Project not found');
    }
    res.status(200).json({
    message:('ok.project'),
    obj: project
    });
    } catch (error) {
    res.status(500).json({
    message:('bad.project'),
    obj: error
    });
    }
    }
    
    module.exports = {
    list,index,create,replace,update,destroy};
