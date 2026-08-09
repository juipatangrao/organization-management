const rolePermissions = require('../utils/permissions');

function checkPermission(requiredPermission) {
  return (req, res, next) => {
    const userPermissions = rolePermissions[req.user.role] || [];
    if (!userPermissions.includes(requiredPermission)) {
      return res.status(403).json({ error: 'Forbidden: permission denied' });
    }
    next();
  };
}

module.exports = checkPermission;