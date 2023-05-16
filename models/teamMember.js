const mongoose = require('mongoose');

const schema = mongoose.Schema({
    __name:String,
    __lastName:String,
    __curp:String,
    __rfc:String,
    __skills:{
        type:String,
        enum:['Junio','Senior','Master']
    },
    __rol:{
        type:String,
        enum:['ScrumMaster','ProductOwner','Developer']
    }
});

class TeamMember{
    constructor(name,lastName,curp,rfc,skills,rol){
        this.__name = name;
        this.__lastName = lastName;
        this.__curp = curp;
        this.__rfc = rfc;
        this.__skills = skills;
        this.__rol = rol;
    }
    get name() {
        return this._name;
    }
    
    set name(value) {
        this._name = value;
    }

    get lastName() {
        return this._lastName;
    }
    
    set lastName(value) {
        this._lastName = value;
    }

    get curp() {
        return this._curp;
    }

    set curp(value) {
        this._curp = value;
    }

    get rfc() {
        return this._rfc;
    }

    set rfc(value) {
        this._rfc = value;
    }

    get skills() {
        return this._skills;
    }

    set skills(value) {
        this._skills = value;
    }

    get rol() {
        return this._rol;
    }

    set rol(value) {
        this._rol = value;
    }
};
schema.loadClass(TeamMember);
module.exports = mongoose.model('TeamMember', schema);