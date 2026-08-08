const DepartmentMember = require('../models/DepartmentMember');

// Add a member to a department
exports.addMember = async (req, res) => {
  try {
    const member = await DepartmentMember.create({
      departmentId: req.params.id,
      userId: req.body.userId,
      role: req.body.role,
    });
    res.status(201).json(member);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all members of a department
exports.getMembers = async (req, res) => {
  try {
    const members = await DepartmentMember.find({ departmentId: req.params.id }).populate('userId', 'name email');
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a member's role
exports.updateMember = async (req, res) => {
  try {
    const member = await DepartmentMember.findByIdAndUpdate(
      req.params.userId,
      req.body,
      { new: true }
    );
    if (!member) return res.status(404).json({ message: 'Not found' });
    res.json(member);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Remove a member from a department
exports.removeMember = async (req, res) => {
  try {
    const member = await DepartmentMember.findByIdAndDelete(req.params.userId);
    if (!member) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Member removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};