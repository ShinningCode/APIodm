const mongoose = require('mongoose');
const schema = mongoose.Schema({
    _title:String,
    _histories:[{
        type:mongoose.Schema.ObjectId,
        ref:'Backlog'
    }]
});
class Column {
    constructor(title, histories) {
        this._title = title;
        this._histories = histories;
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
};

schema.loadClass(Column);
module.exports = mongoose.model('Column', schema);