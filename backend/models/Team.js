const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: [true, "Team name is required"],
      trim: true,
      minlength: [2, "Team name must be at least 2 characters"],
      maxlength: [100, "Team name cannot exceed 100 characters"],
    },

    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
      default: "",
    },

    managerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },

    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

teamSchema.index(
  { departmentId: 1, name: 1 },
  { unique: true }
);

module.exports = mongoose.model("Team", teamSchema);