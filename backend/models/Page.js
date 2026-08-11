const mongoose = require("mongoose");

// A single content block, Notion-style. `type` decides how the frontend renders it.
const blockSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["heading", "text", "bullet", "checklist", "code", "quote"],
      required: true,
    },
    text: {
      type: String,
      default: "",
    },
    checked: {
      // only used when type === "checklist"
      type: Boolean,
      default: false,
    },
    language: {
      // only used when type === "code", e.g. "javascript", "python"
      type: String,
      default: "plaintext",
    },
  },
  { _id: true } // each block gets its own _id so frontend can target it for edits/reorder
);

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

    // Rich content as an ordered array of blocks (heading/bullet/checklist/code/quote/text)
    blocks: {
      type: [blockSchema],
      default: [],
    },

    icon: {
      type: String, // emoji or icon identifier, e.g. "📄"
      default: "📄",
    },

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

    isFavorite: {
      type: Boolean,
      default: false,
      index: true,
    },

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

// Text index for search across title and block text
pageSchema.index({ title: "text", "blocks.text": "text" });

module.exports = mongoose.model("Page", pageSchema);