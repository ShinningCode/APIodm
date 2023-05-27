const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _title:String,
    _histories:[
        {
            type:mongoose.Schema.ObjectId,
            ref:'UserHistory'
        }
    ],
    _backLogType:{
        type:String,
        enum:['Sprint','Release','Product']
    }
});

class Backlog {
    constructor(title, histories, backLogType) {
        this._title = title;
        this._histories = histories;
        this._backLogType = backLogType;
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