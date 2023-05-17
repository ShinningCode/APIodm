const mongoose = require('mongoose');
const { accessibleFieldsPlugin } = require('@casl/mongoose');

const schema = mongoose.Schema(
  {
    name: String,
    requestDate: Date,
    startDate: Date,
    projectManager: {
      type: mongoose.Schema.ObjectId,
      ref: 'TeamMember'
    },
    productOwner: {
      type: mongoose.Schema.ObjectId,
      ref: 'TeamMember'
    },
    developmentTeam: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'TeamMember'
      }
    ],
    description: String,
    status: Boolean
  },
  { timestamps: true }
);

class ProjectRecord {
  static async createAbilityFor(user) {
    const { AbilityBuilder, Ability } = require('@casl/ability');

    const builder = new AbilityBuilder(Ability);

    // Define user abilities
    builder.can('read', 'ProjectRecord');
    builder.can('create', 'ProjectRecord');
    builder.can('update', 'ProjectRecord');
    builder.can('delete', 'ProjectRecord');

    // Adjust abilities based on user role or any other logic
    if (user.role === 'admin') {
      builder.can('manage', 'ProjectRecord');
    }

    return builder.build();
  }

  static async accessibleBy(ability, action = 'read') {
    const query = this.find();
    const permission = ability.can(action, 'ProjectRecord');
    const fields = permission.fields();

    return query.select(fields);
  }
}

schema.loadClass(ProjectRecord);
schema.plugin(accessibleFieldsPlugin);

module.exports = mongoose.model('ProjectRecord', schema);
