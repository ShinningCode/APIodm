const mongoose = require('mongoose');
const Schema = mongoose.Schema({
    __name:String,
    __context:String,
    __rol:String,
    __benefit:String,
    __piority:Int16Array,
    __size:Int16Array,
    __event:[String],
    __result:[String],
    __status:Boolean,
    __colum:Int16Array
});

class UserHistory {
    constructor(name, context, rol, benefit, priority, size, event, result, status, column) {
        this.__name = name;
        this.__context = context;
        this.__rol = rol;
        this.__benefit = benefit;
        this.__priority = priority;
        this.__size = size;
        this.__event = event;
        this.__result = result;
        this.__status = status;
        this.__column = column;
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