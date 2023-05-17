const mongoose = require('mongoose');

const schema = mongoose.Schema({
    __name: String,
    __lastName: String,
    __curp: String,
    __rfc: String,
    __skills: {
        type: String,
        enum: ['Junio', 'Senior', 'Master']
    },
    __rol: {
        type: String,
        enum: ['ScrumMaster', 'ProductOwner', 'Developer']
    },
    __password: String,
    __salt: String,
    __email: String

});

class TeamMember {
    constructor(name, lastName, curp, rfc, skills, rol, password, salt, email) {
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
        return this.__name;
    }

    set name(value) {
        this.__name = value;
    }

    get lastName() {
        return this.__lastName;
    }

    set lastName(value) {
        this.__lastName = value;
    }

    get curp() {
        return this.__curp;
    }

    set curp(value) {
        this.__curp = value;
    }

    get rfc() {
        return this.__rfc;
    }

    set rfc(value) {
        this.__rfc = value;
    }

    get skills() {
        return this.__skills;
    }

    set skills(value) {
        this.__skills = value;
    }

    get rol() {
        return this.__rol;
    }

    set rol(value) {
        this.__rol = value;
    }

    get email() {
        return this.__email;
    }

    set email(v) {
        this.__email = v;
    }

    get password() {
        return this.__password;
    }

    set password(v) {
        this.__password = v;
    }

    get salt() {
        return this.__salt;
    }

    set salt(v) {
        this.__salt = v;
    }
}

schema.loadClass(TeamMember);
module.exports = mongoose.model('TeamMember', schema);
