const { AbilityBuilder, Ability } = require('@casl/ability');

// Define los permisos
function defineAbilitiesFor(user) {
  const { can, cannot, build } = new AbilityBuilder(Ability);

  if (user.role === 'admin') {
    // Los administradores tienen acceso completo
    can('manage', 'all');
  } else {
    // Otros roles tienen permisos limitados
    can('read', 'Post');
    can('create', 'Post');
    can('update', 'Post', { author: user.id });
    cannot('delete', 'Post');
  }

  return build();
}

module.exports = defineAbilitiesFor;
