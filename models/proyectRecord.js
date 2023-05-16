const mongoose = require('mongoose');

const schema = mongoose.Schema({
    __name:String,
    __requestDate:Date,
    __startDate:Date,
    __proyectManager:{
        type:mongoose.Schema.ObjectId,
        ref:'TeamMember'
    },
    __productOwner:{
        type:mongoose.Schema.ObjectId,
        ref:'TeamMember'
    },
    __DevelopmentTeam:[
        {
            type:mongoose.Schema.ObjectId,
            ref:'TeamMember'
        }
    ],
    __description:String,
    __status:Boolean
});

class ProjectRecord {
    constructor(name, requestDate, startDate, projectManager, productOwner, developmentTeam, description, status) {
        this.__name = name;
        this.__requestDate = requestDate;
        this.__startDate = startDate;
        this.__projectManager = projectManager;
        this.__productOwner = productOwner;
        this.__developmentTeam = developmentTeam;
        this.__description = description;
        this.__status = status;
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