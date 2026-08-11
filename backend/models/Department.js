const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Department name is required"],
      trim: true,
      minlength: [2, "Department name must be at least 2 characters"],
      maxlength: [100, "Department name cannot exceed 100 characters"],
    },

    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
      default: "",
    },

    headId: {
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
    code: {
      type: String,
      trim: true,
      uppercase: true,
      maxlength: [10, "Code cannot exceed 10 characters"],
    },

    managerTitle: {
      type: String,
      trim: true,
      default: "Department Head",
    },

    budget: {
      type: Number,
      default: 0,
    },
    
    themeColor: {
      type: String,
      trim: true,
      default: "indigo", // e.g. "indigo", "purple", "green" — frontend maps this to accent colors
    },
  },
  {
    timestamps: true,
  },
);

departmentSchema.index({ name: 1 }, { unique: true });

module.exports = mongoose.model("Department", departmentSchema);
