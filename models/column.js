const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _title:String,
    _backlogs:[{
        type:mongoose.Schema.ObjectId,
        ref:'Backlog'
    }]
});

class Column {
    constructor(title, backlogs) {
        this._title = title;
        this._backlogs = backlogs;
    }

    get title() {
        return this._title;
    }

    set title(value) {
        this._title = value;
    }

    get backlogs() {
        return this._backlogs;
    }

    set backlogs(value) {
        this._backlogs = value;
    }
};

schema.loadClass(Column);
module.exports = mongoose.model('Column', schema);