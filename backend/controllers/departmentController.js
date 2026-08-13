// const mongoose = require("mongoose");

// const Department = require("../models/Department");
// const DepartmentMember = require("../models/DepartmentMember");
// const Team = require("../models/Team");
// const TeamMember = require("../models/TeamMember");

// const { createAuditLog } = require("../services/auditService");

// // CREATE DEPARTMENT
// exports.createDepartment = async (req, res) => {
//   try {
//     const { name, description, headId } = req.body;

//     if (!name || !name.trim()) {
//       return res.status(400).json({
//         message: "Department name is required",
//       });
//     }

//     const existingDepartment = await Department.findOne({
//       name: name.trim(),
//     });

//     if (existingDepartment) {
//       return res.status(409).json({
//         message: "Department with this name already exists",
//       });
//     }

//     const department = await Department.create({
//       name: name.trim(),
//       description: description?.trim() || "",
//       headId: headId || null,
//     });

//     await createAuditLog({
//       action: "DEPARTMENT_CREATED",
//       performedBy: req.user.userId,
//       departmentId: department._id,
//       details: `Department "${department.name}" created`,
//     });

//     res.status(201).json({
//       message: "Department created successfully",
//       department,
//     });
//   } catch (error) {
//     console.error("Create department:", error);

//     res.status(500).json({
//       message: "Failed to create department",
//     });
//   }
// };

// // GET ALL DEPARTMENTS
// exports.getDepartments = async (req, res) => {
//   try {
//     const departments = await Department.find()
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       count: departments.length,
//       departments,
//     });
//   } catch (error) {
//     console.error("Get departments:", error);

//     res.status(500).json({
//       message: "Failed to fetch departments",
//     });
//   }
// };



// // GET DEPARTMENT BY ID
// exports.getDepartmentById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({
//         message: "Invalid department ID",
//       });
//     }

// const department = await Department.findById(id);

//     if (!department) {
//       return res.status(404).json({
//         message: "Department not found",
//       });
//     }

//     const memberCount = await DepartmentMember.countDocuments({
//       departmentId: id,
//     });

//     const teamCount = await Team.countDocuments({
//       departmentId: id,
//     });

//     res.status(200).json({
//       department,
//       statistics: {
//         totalEmployees: memberCount,
//         totalTeams: teamCount,
//       },
//     });
//   } catch (error) {
//     console.error("Get department:", error);

//     res.status(500).json({
//       message: "Failed to fetch department",
//     });
//   }
// };

// // UPDATE DEPARTMENT
// exports.updateDepartment = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, description, headId } = req.body;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({
//         message: "Invalid department ID",
//       });
//     }

//     const department = await Department.findById(id);

//     if (!department) {
//       return res.status(404).json({
//         message: "Department not found",
//       });
//     }

//     if (name !== undefined) {
//       if (!name.trim()) {
//         return res.status(400).json({
//           message: "Department name cannot be empty",
//         });
//       }

//       const duplicate = await Department.findOne({
//         name: name.trim(),
//         _id: { $ne: id },
//       });

//       if (duplicate) {
//         return res.status(409).json({
//           message: "Another department already has this name",
//         });
//       }

//       department.name = name.trim();
//     }

//     if (description !== undefined) {
//       department.description = description.trim();
//     }

//     if (headId !== undefined) {
//       department.headId = headId || null;
//     }

//     await department.save();

//     await createAuditLog({
//       action: "DEPARTMENT_UPDATED",
//       performedBy: req.user.userId,
//       departmentId: department._id,
//       details: `Department "${department.name}" updated`,
//     });

//     res.status(200).json({
//       message: "Department updated successfully",
//       department,
//     });
//   } catch (error) {
//     console.error("Update department:", error);

//     res.status(500).json({
//       message: "Failed to update department",
//     });
//   }
// };

// // DELETE DEPARTMENT
// exports.deleteDepartment = async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({
//         message: "Invalid department ID",
//       });
//     }

//     const department = await Department.findById(id);

//     if (!department) {
//       return res.status(404).json({
//         message: "Department not found",
//       });
//     }

//     const teams = await Team.find({
//       departmentId: id,
//     }).select("_id");

//     const teamIds = teams.map((team) => team._id);

//     // Delete team members
//     if (teamIds.length > 0) {
//       await TeamMember.deleteMany({
//         teamId: { $in: teamIds },
//       });
//     }

//     // Delete teams
//     await Team.deleteMany({
//       departmentId: id,
//     });

//     // Delete department members
//     await DepartmentMember.deleteMany({
//       departmentId: id,
//     });

//     // Delete department
//     await Department.findByIdAndDelete(id);

//     await createAuditLog({
//       action: "DEPARTMENT_DELETED",
//       performedBy: req.user.userId,
//       departmentId: id,
//       details: `Department "${department.name}" deleted`,
//     });

//     res.status(200).json({
//       message: "Department and related data deleted successfully",
//     });
//   } catch (error) {
//     console.error("Delete department:", error);

//     res.status(500).json({
//       message: "Failed to delete department",
//     });
//   }
// };
const mongoose = require("mongoose");

const Department = require("../models/Department");
const DepartmentMember = require("../models/DepartmentMember");
const Team = require("../models/Team");
const TeamMember = require("../models/TeamMember");

const { createAuditLog } = require("../services/auditService");

// =========================================================
// CREATE DEPARTMENT
// =========================================================

exports.createDepartment = async (req, res) => {
  try {
    const {
      name,
      description,
      headId,
      code,
      managerTitle,
      budget,
      themeColor,
    } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        message: "Department name is required",
      });
    }

    // Check duplicate department name
    const existingDepartment = await Department.findOne({
      name: name.trim(),
    });

    if (existingDepartment) {
      return res.status(409).json({
        message: "Department with this name already exists",
      });
    }

    // Check duplicate code if provided
    if (code && code.trim()) {
      const existingCode = await Department.findOne({
        code: code.trim().toUpperCase(),
      });

      if (existingCode) {
        return res.status(409).json({
          message: "Department code already exists",
        });
      }
    }

    const department = await Department.create({
      name: name.trim(),
      description: description?.trim() || "",
      headId: headId || null,
      code: code?.trim().toUpperCase() || "",
      managerTitle: managerTitle?.trim() || "Department Head",
      budget: Number(budget) || 0,
      themeColor: themeColor?.trim() || "indigo",
    });

    // Audit log
    await createAuditLog({
      action: "DEPARTMENT_CREATED",
      performedBy: req.user.userId,
      departmentId: department._id,
      details: `Department "${department.name}" created`,
    });

    res.status(201).json({
      message: "Department created successfully",
      department,
    });
  } catch (error) {
    console.error("Create department:", error);

    res.status(500).json({
      message: "Failed to create department",
    });
  }
};


// =========================================================
// GET ALL DEPARTMENTS
// =========================================================

exports.getDepartments = async (req, res) => {
  try {
    const departments = await Department.find()
      .sort({ createdAt: -1 });

    // Get member count for every department
    const departmentsWithStats = await Promise.all(
      departments.map(async (department) => {
        const memberCount = await DepartmentMember.countDocuments({
          departmentId: department._id,
          status: "Active",
        });

        return {
          ...department.toObject(),
          members: memberCount,
        };
      })
    );

    res.status(200).json({
      count: departmentsWithStats.length,
      departments: departmentsWithStats,
    });
  } catch (error) {
    console.error("Get departments:", error);

    res.status(500).json({
      message: "Failed to fetch departments",
    });
  }
};


// =========================================================
// GET DEPARTMENT BY ID
// =========================================================

exports.getDepartmentById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid department ID",
      });
    }

    const department = await Department.findById(id);

    if (!department) {
      return res.status(404).json({
        message: "Department not found",
      });
    }

    const memberCount = await DepartmentMember.countDocuments({
      departmentId: id,
      status: "Active",
    });

    const teamCount = await Team.countDocuments({
      departmentId: id,
    });

    res.status(200).json({
      department: {
        ...department.toObject(),
        members: memberCount,
      },

      statistics: {
        totalEmployees: memberCount,
        totalTeams: teamCount,
      },
    });
  } catch (error) {
    console.error("Get department:", error);

    res.status(500).json({
      message: "Failed to fetch department",
    });
  }
};


// =========================================================
// UPDATE DEPARTMENT
// =========================================================

exports.updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      description,
      headId,
      code,
      managerTitle,
      budget,
      themeColor,
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid department ID",
      });
    }

    const department = await Department.findById(id);

    if (!department) {
      return res.status(404).json({
        message: "Department not found",
      });
    }

    // Name
    if (name !== undefined) {
      if (!name.trim()) {
        return res.status(400).json({
          message: "Department name cannot be empty",
        });
      }

      const duplicate = await Department.findOne({
        name: name.trim(),
        _id: { $ne: id },
      });

      if (duplicate) {
        return res.status(409).json({
          message: "Another department already has this name",
        });
      }

      department.name = name.trim();
    }

    // Description
    if (description !== undefined) {
      department.description = description.trim();
    }

    // Department head
    if (headId !== undefined) {
      department.headId = headId || null;
    }

    // Code
    if (code !== undefined) {
      const formattedCode = code.trim().toUpperCase();

      if (formattedCode) {
        const duplicateCode = await Department.findOne({
          code: formattedCode,
          _id: { $ne: id },
        });

        if (duplicateCode) {
          return res.status(409).json({
            message: "Another department already has this code",
          });
        }
      }

      department.code = formattedCode;
    }

    // Manager title
    if (managerTitle !== undefined) {
      department.managerTitle =
        managerTitle.trim() || "Department Head";
    }

    // Budget
    if (budget !== undefined) {
      department.budget = Number(budget) || 0;
    }

    // Theme
    if (themeColor !== undefined) {
      department.themeColor = themeColor.trim();
    }

    department.updatedAt = new Date();

    await department.save();

    await createAuditLog({
      action: "DEPARTMENT_UPDATED",
      performedBy: req.user.userId,
      departmentId: department._id,
      details: `Department "${department.name}" updated`,
    });

    res.status(200).json({
      message: "Department updated successfully",
      department,
    });
  } catch (error) {
    console.error("Update department:", error);

    res.status(500).json({
      message: "Failed to update department",
    });
  }
};


// =========================================================
// DELETE DEPARTMENT
// =========================================================

exports.deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid department ID",
      });
    }

    const department = await Department.findById(id);

    if (!department) {
      return res.status(404).json({
        message: "Department not found",
      });
    }

    const teams = await Team.find({
      departmentId: id,
    }).select("_id");

    const teamIds = teams.map((team) => team._id);

    // Delete team members
    if (teamIds.length > 0) {
      await TeamMember.deleteMany({
        teamId: { $in: teamIds },
      });
    }

    // Delete teams
    await Team.deleteMany({
      departmentId: id,
    });

    // Delete department members
    await DepartmentMember.deleteMany({
      departmentId: id,
    });

    // Delete department
    await Department.findByIdAndDelete(id);

    // Audit log
    await createAuditLog({
      action: "DEPARTMENT_DELETED",
      performedBy: req.user.userId,
      departmentId: id,
      details: `Department "${department.name}" deleted`,
    });

    res.status(200).json({
      message: "Department and related data deleted successfully",
    });
  } catch (error) {
    console.error("Delete department:", error);

    res.status(500).json({
      message: "Failed to delete department",
    });
  }
};