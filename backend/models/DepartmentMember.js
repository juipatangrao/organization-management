const mongoose = require('mongoose');

const departmentMemberSchema = new mongoose.Schema({
  departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  role: { type: String, enum: ['hr', 'team_manager', 'employee'], default: 'employee' },
  joinedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('DepartmentMember', departmentMemberSchema);