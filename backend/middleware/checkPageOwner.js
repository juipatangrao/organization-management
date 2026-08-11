const mongoose = require("mongoose");
const Page = require("../models/Page");

// Ensures the logged-in user owns the page referenced by :pageId in the URL.
async function checkPageOwner(req, res, next) {
  try {
    const { pageId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(pageId)) {
      return res.status(400).json({ message: "Invalid page ID" });
    }

    const page = await Page.findById(pageId);

    if (!page) {
      return res.status(404).json({ message: "Page not found" });
    }

    if (page.ownerId.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized to access this page" });
    }

    req.page = page;
    next();
  } catch (error) {
    console.error("checkPageOwner:", error);
    res.status(500).json({ message: "Failed to verify page ownership" });
  }
}

module.exports = checkPageOwner;