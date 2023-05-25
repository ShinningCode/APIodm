const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _name:String,
    _lastName:String,
    _curp:String,
    _rfc:String,
    _skills:{
        type:String,
        enum:['Junior','Senior','Master']
    },
    _rol:{
        type:String,
        enum:['ScrumMaster','ProductOwner','Developer']
    },
    _password:String,
    _salt:String,
    _email:String

});

class TeamMember{
    constructor(name,lastName,curp,rfc,skills,rol,password,salt,email){
        this._name = name;
        this._lastName = lastName;
        this._curp = curp;
        this._rfc = rfc;
        this._skills = skills;
        this._rol = rol;
        this._password = password;
        this._email = email;
        this._salt = salt;
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

    get email(){
        return this._email;
    }

    set email(v){
        this._email = v;
    }

    get password(){
        return this._password;
    }

    set password(v){
        this._password = v;
    }

    get salt(){
        return this._salt;
    }

    set salt(v){
        this._salt = v;
    }
};
schema.loadClass(TeamMember);
module.exports = mongoose.model('TeamMember', schema);