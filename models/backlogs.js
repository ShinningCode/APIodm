const mongoose = require('mongoose');

const schema = mongoose.Schema({
    __title:String,
    __histories:[
        {
            type:mongoose.Schema.ObjectId,
            ref:'UserHistory'
        }
    ],
    __BackLogtype:{
        type:String,
        enum:['Sprint','Release','Product']
    }
});

class Backlog {
    constructor(title, histories, backLogType) {
        this.__title = title;
        this.__histories = histories;
        this.__backLogType = backLogType;
    }

    get title() {
        return this._title;
    }

    set title(value) {
        this._title = value;
    }

    get histories() {
        return this._histories;
    }

    set histories(value) {
        this._histories = value;
    }

    get backLogType() {
        return this._backLogType;
    }

    set backLogType(value) {
        this._backLogType = value;
    }
};

schema.loadClass(Backlog);
module.exports = mongoose.model('Backlog', schema);