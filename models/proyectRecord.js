const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _proyectName:String,
    _requestDate:Date,
    _startDate:Date,
    _proyectManager:{
        type:mongoose.Schema.ObjectId,
        ref:'TeamMember'
    },
    _productOwner:{
        type:mongoose.Schema.ObjectId,
        ref:'TeamMember'
    },
    _developmentTeam:[
        {
            type:mongoose.Schema.ObjectId,
            ref:'TeamMember'
        }
    ],
    _description:String,
    _status:Boolean
});

class ProjectRecord{
    constructor(name, requestDate, startDate, projectManager, productOwner, developmentTeam, description, status) {
        this._name = name;
        this._requestDate = requestDate;
        this._startDate = startDate;
        this._projectManager = projectManager;
        this._productOwner = productOwner;
        this._developmentTeam = developmentTeam;
        this._description = description;
        this._status = status;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get requestDate() {
        return this._requestDate;
    }

    set requestDate(value) {
        this._requestDate = value;
    }

    get startDate() {
        return this._startDate;
    }

    set startDate(value) {
        this._startDate = value;
    }

    get projectManager() {
        return this._projectManager;
    }

    set projectManager(value) {
        this._projectManager = value;
    }

    get productOwner() {
        return this._productOwner;
    }

    set productOwner(value) {
        this._productOwner = value;
    }

    get developmentTeam() {
        return this._developmentTeam;
    }

    set developmentTeam(value) {
        this._developmentTeam = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get status() {
        return this._status;
    }

    set status(value) {
        this._status = value;
    }
};

schema.loadClass(ProjectRecord);
module.exports = mongoose.model('ProjectRecord', schema);