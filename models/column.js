const mongoose = require('mongoose');
const { AbilityBuilder, Ability } = require('@casl/ability');

const schema = mongoose.Schema({
  _title: String,
  _histories: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Backlog'
    }
  ]
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
}

schema.loadClass(Column);

// Define la función para construir las habilidades (abilities) con CASL
function defineAbilitiesFor(user) {
  const { can, rules } = AbilityBuilder.extract();
  
  // Define los permisos según el rol del usuario
  if (user.role === 'admin') {
    can('manage', 'Column'); // Permisos de administrador
  } else if (user.role === 'user') {
    can('read', 'Column'); // Permisos de usuario normal
  }

  return new Ability(rules);
}

// Exporta la función de habilidades y el modelo Column
module.exports = {
  defineAbilitiesFor,
  Column: mongoose.model('Column', schema)
};
