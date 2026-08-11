const mongoose = require("mongoose");
const Page = require("../models/Page");

// CREATE PAGE
exports.createPage = async (req, res) => {
  try {
    const { title, content, icon, parentId } = req.body;
    const ownerId = req.user.userId;

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
      content: content || "",
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

// GET ALL PAGES (flat list for the logged-in user, excludes archived by default)
exports.getPages = async (req, res) => {
  try {
    const ownerId = req.user.userId;
    const includeArchived = req.query.includeArchived === "true";

    const filter = { ownerId };
    if (!includeArchived) {
      filter.isArchived = false;
    }

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

// GET ONE PAGE (with its direct children listed for navigation)
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

// UPDATE PAGE (title, content, icon, or move to a different parent)
exports.updatePage = async (req, res) => {
  try {
    const page = req.page; // set by checkPageOwner middleware
    const { title, content, icon, parentId, position } = req.body;

    if (title !== undefined) {
      page.title = title.trim() || "Untitled";
    }

    if (content !== undefined) {
      page.content = content;
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

    // Recursively collect all descendant page IDs so nested sub-pages
    // don't get orphaned when a parent page is deleted.
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