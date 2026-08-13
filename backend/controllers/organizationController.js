const Organization = require("../models/Organization");

// GET company info — creates a default doc on first call if none exists yet
exports.getOrganization = async (req, res) => {
  try {
    let organization = await Organization.findOne();

    if (!organization) {
      organization = await Organization.create({
        name: "My Company",
      });
    }

    res.status(200).json({ organization });
  } catch (error) {
    console.error("Get organization:", error);
    res.status(500).json({ message: "Failed to fetch organization info" });
  }
};

// UPDATE company info (HR only, enforced in the route)
exports.updateOrganization = async (req, res) => {
  try {
    const {
      name,
      tagline,
      description,
      website,
      locations,
      foundedYear,
      industry,
      logoUrl,
    } = req.body;

    let organization = await Organization.findOne();

    if (!organization) {
      organization = new Organization({});
    }

    if (name !== undefined) organization.name = name.trim();
    if (tagline !== undefined) organization.tagline = tagline.trim();
    if (description !== undefined)
      organization.description = description.trim();
    if (website !== undefined) organization.website = website.trim();
    if (locations !== undefined) organization.locations = locations;
    if (foundedYear !== undefined) organization.foundedYear = foundedYear;
    if (industry !== undefined) organization.industry = industry.trim();
    if (logoUrl !== undefined) organization.logoUrl = logoUrl.trim();

    await organization.save();

    res.status(200).json({
      message: "Organization info updated successfully",
      organization,
    });
  } catch (error) {
    console.error("Update organization:", error);
    res.status(500).json({ message: "Failed to update organization info" });
  }
};
