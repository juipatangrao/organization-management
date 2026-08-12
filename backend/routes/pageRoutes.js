const express = require("express");

const router = express.Router();

const {
  createPage,
  getPages,
  searchPages,
  getPageById,
  updatePage,
  toggleFavorite,
  archivePage,
  restorePage,
  deletePage,
} = require("../controllers/pageController");

const authenticate = require("../middleware/authenticate");
const checkPageOwner = require("../middleware/checkPageOwner");
const { sensitiveLimiter } = require("../middleware/rateLimiter");

// NOTE: /search must be declared BEFORE /:pageId, otherwise Express will
// treat "search" as a pageId value and checkP77\\\ageOwner will fail on it.
router.get("/search", authenticate, searchPages);

router.post("/", authenticate, createPage);

router.get("/", authenticate, getPages);

router.get("/:pageId", authenticate, checkPageOwner, getPageById);

router.put("/:pageId", authenticate, checkPageOwner, updatePage);

router.patch("/:pageId/favorite", authenticate, checkPageOwner, toggleFavorite);

router.patch("/:pageId/archive", authenticate, checkPageOwner, archivePage);

router.patch("/:pageId/restore", authenticate, checkPageOwner, restorePage);

router.delete(
  "/:pageId",
  authenticate,
  checkPageOwner,
  sensitiveLimiter,
  deletePage
);

module.exports = router;