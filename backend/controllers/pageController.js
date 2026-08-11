const mongoose = require("mongoose");
const Page = require("../models/Page");

const ALLOWED_BLOCK_TYPES = ["heading", "text", "bullet", "checklist", "code", "quote"];

function validateBlocks(blocks) {
  if (blocks === undefined) return null; // not provided, skip
  if (!Array.isArray(blocks)) return "blocks must be an array";

  for (const block of blocks) {
    if (!block.type || !ALLOWED_BLOCK_TYPES.includes(block.type)) {
      return `Invalid block type: ${block.type}`;
    }
  }
  return null;
}

// CREATE PAGE
exports.createPage = async (req, res) => {
  try {
    const { title, blocks, icon, parentId } = req.body;
    const ownerId = req.user.userId;

    const blockError = validateBlocks(blocks);
    if (blockError) {
      return res.status(400).json({ message: blockError });
    }

    if (parentId) {
      if (!mongoose.Types.ObjectId.isValid(parentId)) {
        return res.status(400).json({ message: "Invalid parent page ID" });
      }

      const parentPage = await Page.findById(parentId);

      if (!parentPage) {
        return res.status(404).json({ message: "Parent page not found" });
      }

      if (parentPage.ownerId.toString() !== ownerId) {
        return res.status(403).json({ message: "Not authorized to add a page under this parent" });
      }
    }

    const page = await Page.create({
      ownerId,
      title: title?.trim() || "Untitled",
      blocks: blocks || [],
      icon: icon || "📄",
      parentId: parentId || null,
    });

    res.status(201).json({
      message: "Page created successfully",
      page,
    });
  } catch (error) {
    console.error("Create page:", error);
    res.status(500).json({ message: "Failed to create page" });
  }
};

// GET ALL PAGES (flat list, excludes archived by default; ?favorite=true filters favorites)
exports.getPages = async (req, res) => {
  try {
    const ownerId = req.user.userId;
    const includeArchived = req.query.includeArchived === "true";
    const onlyFavorites = req.query.favorite === "true";

    const filter = { ownerId };
    if (!includeArchived) filter.isArchived = false;
    if (onlyFavorites) filter.isFavorite = true;

    const pages = await Page.find(filter).sort({ parentId: 1, position: 1, createdAt: 1 });

    res.status(200).json({
      count: pages.length,
      pages,
    });
  } catch (error) {
    console.error("Get pages:", error);
    res.status(500).json({ message: "Failed to fetch pages" });
  }
};

// SEARCH PAGES (title + block text), scoped to the logged-in user only
exports.searchPages = async (req, res) => {
  try {
    const ownerId = req.user.userId;
    const { q } = req.query;

    if (!q || !q.trim()) {
      return res.status(400).json({ message: "Search query 'q' is required" });
    }

    const pages = await Page.find(
      {
        ownerId,
        isArchived: false,
        $text: { $search: q.trim() },
      },
      { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } });

    res.status(200).json({
      count: pages.length,
      pages,
    });
  } catch (error) {
    console.error("Search pages:", error);
    res.status(500).json({ message: "Failed to search pages" });
  }
};

// GET ONE PAGE (with its direct children)
exports.getPageById = async (req, res) => {
  try {
    const page = req.page; // set by checkPageOwner middleware

    const children = await Page.find({
      parentId: page._id,
      isArchived: false,
    }).sort({ position: 1, createdAt: 1 });

    res.status(200).json({
      page,
      children,
    });
  } catch (error) {
    console.error("Get page:", error);
    res.status(500).json({ message: "Failed to fetch page" });
  }
};

// UPDATE PAGE (title, blocks, icon, move to different parent, reorder)
exports.updatePage = async (req, res) => {
  try {
    const page = req.page; // set by checkPageOwner middleware
    const { title, blocks, icon, parentId, position } = req.body;

    if (title !== undefined) {
      page.title = title.trim() || "Untitled";
    }

    if (blocks !== undefined) {
      const blockError = validateBlocks(blocks);
      if (blockError) {
        return res.status(400).json({ message: blockError });
      }
      page.blocks = blocks;
    }

    if (icon !== undefined) {
      page.icon = icon;
    }

    if (position !== undefined) {
      page.position = position;
    }

    if (parentId !== undefined) {
      if (parentId === null) {
        page.parentId = null;
      } else {
        if (!mongoose.Types.ObjectId.isValid(parentId)) {
          return res.status(400).json({ message: "Invalid parent page ID" });
        }

        if (parentId === page._id.toString()) {
          return res.status(400).json({ message: "A page cannot be its own parent" });
        }

        const newParent = await Page.findById(parentId);

        if (!newParent) {
          return res.status(404).json({ message: "Parent page not found" });
        }

        if (newParent.ownerId.toString() !== req.user.userId) {
          return res.status(403).json({ message: "Not authorized to move page under this parent" });
        }

        page.parentId = parentId;
      }
    }

    await page.save();

    res.status(200).json({
      message: "Page updated successfully",
      page,
    });
  } catch (error) {
    console.error("Update page:", error);
    res.status(500).json({ message: "Failed to update page" });
  }
};

// TOGGLE FAVORITE
exports.toggleFavorite = async (req, res) => {
  try {
    const page = req.page;
    page.isFavorite = !page.isFavorite;
    await page.save();

    res.status(200).json({
      message: page.isFavorite ? "Page added to favorites" : "Page removed from favorites",
      page,
    });
  } catch (error) {
    console.error("Toggle favorite:", error);
    res.status(500).json({ message: "Failed to update favorite status" });
  }
};

// ARCHIVE / RESTORE PAGE (soft delete)
exports.archivePage = async (req, res) => {
  try {
    const page = req.page;
    page.isArchived = true;
    await page.save();

    res.status(200).json({
      message: "Page archived successfully",
      page,
    });
  } catch (error) {
    console.error("Archive page:", error);
    res.status(500).json({ message: "Failed to archive page" });
  }
};

exports.restorePage = async (req, res) => {
  try {
    const page = req.page;
    page.isArchived = false;
    await page.save();

    res.status(200).json({
      message: "Page restored successfully",
      page,
    });
  } catch (error) {
    console.error("Restore page:", error);
    res.status(500).json({ message: "Failed to restore page" });
  }
};

// DELETE PAGE (permanent, cascades to all nested sub-pages)
exports.deletePage = async (req, res) => {
  try {
    const page = req.page;

    const collectDescendantIds = async (parentId) => {
      const children = await Page.find({ parentId }).select("_id");
      let ids = children.map((c) => c._id);

      for (const child of children) {
        const nestedIds = await collectDescendantIds(child._id);
        ids = ids.concat(nestedIds);
      }

      return ids;
    };

    const descendantIds = await collectDescendantIds(page._id);

    await Page.deleteMany({ _id: { $in: [page._id, ...descendantIds] } });

    res.status(200).json({
      message: "Page and its sub-pages deleted successfully",
      deletedCount: descendantIds.length + 1,
    });
  } catch (error) {
    console.error("Delete page:", error);
    res.status(500).json({ message: "Failed to delete page" });
  }
};