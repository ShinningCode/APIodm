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
    },
    __password:String,
    __salt:String,
    __email:String

});

class TeamMember{
    constructor(name,lastName,curp,rfc,skills,rol,password,salt,email){
        this.__name = name;
        this.__lastName = lastName;
        this.__curp = curp;
        this.__rfc = rfc;
        this.__skills = skills;
        this.__rol = rol;
        this.__password = password;
        this.__email = email;
        this.__salt = salt;
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