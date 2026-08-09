const Department = require('../models/Department');
const DepartmentMember = require('../models/DepartmentMember');
const Team = require('../models/Team');
const TeamMember = require('../models/TeamMember');

// Create
exports.createDepartment = async (req, res) => {
  try {
    const department = await Department.create(req.body);
    res.status(201).json(department);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all
exports.getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get one
exports.getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) return res.status(404).json({ message: 'Not found' });
    res.json(department);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update
exports.updateDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!department) return res.status(404).json({ message: 'Not found' });
    res.json(department);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete
// Delete
exports.deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndDelete(req.params.id);
    if (!department) return res.status(404).json({ message: 'Not found' });

    // find all teams in this department
    const teams = await Team.find({ departmentId: req.params.id });
    const teamIds = teams.map(team => team._id);

    // delete team members belonging to those teams
    await TeamMember.deleteMany({ teamId: { $in: teamIds } });

    // delete the teams themselves
    await Team.deleteMany({ departmentId: req.params.id });

    // delete department members
    await DepartmentMember.deleteMany({ departmentId: req.params.id });

    res.json({ message: 'Department and all related data deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};