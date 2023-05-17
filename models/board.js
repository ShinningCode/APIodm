const mongoose = require('mongoose');
const { AbilityBuilder } = require('@casl/ability');

const schema = mongoose.Schema({
  __name: String,
  __columns: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Column'
    }
  ]
});

class Board {
  constructor(name, columns, user) {
    this.__name = name;
    this.__columns = columns;
    this.__user = user;
  }

  get name() {
    return this.__name;
  }

  set name(value) {
    this.__name = value;
  }

  get columns() {
    return this.__columns;
  }

  set columns(value) {
    this.__columns = value;
  }

  can(action, subject) {
    const { can } = AbilityBuilder.extract();

    // Define los permisos para el usuario actual
    // Reemplaza los permisos de ejemplo con tus propias reglas de permisos
    const permissions = can(this.__user.role, action, subject);

    return permissions.granted;
  }
}

schema.loadClass(Board);
module.exports = mongoose.model('Board', schema);
