const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _name:String,
    _context:String,
    _rol:String,
    _benefit:String,
    _priority:Number,
    _size:Number,
    _event:String,
    _result:String,
    _status:Boolean,
    _column:Number
});

class UserHistory {
    constructor(name, context, rol, benefit, priority, size, event, result, status, column) {
        this._name = name;
        this._context = context;
        this._rol = rol;
        this._benefit = benefit;
        this._priority = priority;
        this._size = size;
        this._event = event;
        this._result = result;
        this._status = status;
        this._column = column;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get context() {
        return this._context;
    }

    set context(value) {
        this._context = value;
    }

    get rol() {
        return this._rol;
    }

    set rol(value) {
        this._rol = value;
    }

    get benefit() {
        return this._benefit;
    }

    set benefit(value) {
        this._benefit = value;
    }

    get priority() {
        return this._priority;
    }

    set priority(value) {
        this._priority = value;
    }

    get size() {
        return this._size;
    }

    set size(value) {
        this._size = value;
    }

    get event() {
        return this._event;
    }

    set event(value) {
        this._event = value;
    }

    get result() {
        return this._result;
    }

    set result(value) {
        this._result = value;
    }

    get status() {
        return this._status;
    }

    set status(value) {
        this._status = value;
    }

    get column() {
        return this._column;
    }

    set column(value) {
        this._column = value;
    }
};

schema.loadClass(UserHistory);
module.exports = mongoose.model('UserHistory', schema);