const rolePermissions = {
  hr: [
    'department.create', 'department.edit', 'department.delete',
    'employee.add', 'employee.remove', 'employee.changeRole',
    'team.create', 'team.edit', 'team.delete'
  ],
  team_manager: [
    'team.viewMembers', 'team.editInfo', 'team.addMember', 'team.removeMember'
  ],
  employee: [
    'team.view', 'department.view'
  ]
};

module.exports = rolePermissions;