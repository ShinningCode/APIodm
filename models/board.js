const mongoose = require('mongoose');

const schema = mongoose.Schema({
    __name:String,
    __columns:[
        {
            type:mongoose.Schema.ObjectId,
            ref:'Column'
        }
    ]
});

class Board {
    constructor(name, columns) {
        this.__name = name;
        this.__columns = columns;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get columns() {
        return this._columns;
    }

    set columns(value) {
        this._columns = value;
    }
};

schema.loadClass(Board);
module.exports = mongoose.model('Board', schema);