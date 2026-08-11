const mongoose = require("mongoose");

const pageSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      trim: true,
      default: "Untitled",
      maxlength: [200, "Title cannot exceed 200 characters"],
    },

    // Simple rich text / block content stored as a string (markdown or JSON string).
    content: {
      type: String,
      default: "",
    },

    icon: {
      type: String, // emoji or icon identifier, e.g. "📄"
      default: "📄",
    },

    // Self-reference for nested pages (sub-pages). null = top-level page.
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Page",
      default: null,
      index: true,
    },

    isArchived: {
      type: Boolean,
      default: false,
      index: true,
    },

    // Order among siblings, for manual drag-and-drop ordering in the sidebar
    position: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

pageSchema.index({ ownerId: 1, parentId: 1 });

module.exports = mongoose.model("Page", pageSchema);