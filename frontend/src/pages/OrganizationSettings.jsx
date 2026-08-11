import { useState } from "react";
import {
  Building2,
  Globe,
  MapPin,
  User,
  Save,
  Camera,
} from "lucide-react";

import OrganizationHeader from "../components/OrganizationHeader";
import OrganizationSidebar from "../components/OrganizationSidebar";

function OrganizationSettings() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [organization, setOrganization] = useState({
    name: "ABC Technologies",
    description:
      "A technology company focused on building modern digital products.",
    website: "https://www.abctechnologies.com",
    location: "Pune, Maharashtra, India",
    owner: "Jui Deshmukh",
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setOrganization((previous) => ({
      ...previous,
      [name]: value,
    }));

    setSaved(false);
  };

  const handleSave = (event) => {
    event.preventDefault();

    setSaved(true);

    console.log(
      "Organization settings:",
      organization
    );
  };

  return (
    <div className="app-layout">

      {/* Header */}

      <OrganizationHeader
        onMenuClick={() =>
          setSidebarOpen(!sidebarOpen)
        }
      />

      <div className="main-layout">

        {/* Sidebar */}

        <div
          className={`sidebar-wrapper ${
            sidebarOpen
              ? "sidebar-mobile-open"
              : ""
          }`}
        >
          <OrganizationSidebar role="hr" />
        </div>

        {/* Main Content */}

        <main className="main-content">

          {/* Page Heading */}

          <div className="page-heading">

            <div>
              <span className="page-label">
                ADMINISTRATION
              </span>

              <h1>Organization Settings</h1>

              <p>
                Manage your organization's
                information and settings.
              </p>
            </div>

          </div>

          {/* Settings Card */}

          <form
            className="settings-card"
            onSubmit={handleSave}
          >

            {/* Organization Profile */}

            <div className="settings-section">

              <div className="settings-section-heading">

                <div className="settings-heading-icon">
                  <Building2 size={19} />
                </div>

                <div>
                  <h2>
                    Organization Profile
                  </h2>

                  <p>
                    Basic information about your
                    organization.
                  </p>
                </div>

              </div>


              {/* Logo */}

              <div className="organization-logo-section">

                <div className="organization-logo">
                  ABC
                </div>

                <div>
                  <h3>Organization Logo</h3>

                  <p>
                    Upload a logo to represent
                    your organization.
                  </p>

                  <button
                    type="button"
                    className="secondary-button"
                  >
                    <Camera size={15} />
                    Change Logo
                  </button>
                </div>

              </div>


              {/* Organization Name */}

              <div className="form-group">

                <label htmlFor="name">
                  Organization Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={organization.name}
                  onChange={handleChange}
                  placeholder="Enter organization name"
                />

              </div>


              {/* Description */}

              <div className="form-group">

                <label htmlFor="description">
                  Description
                </label>

                <textarea
                  id="description"
                  name="description"
                  value={
                    organization.description
                  }
                  onChange={handleChange}
                  placeholder="Describe your organization"
                  rows="4"
                />

              </div>

            </div>


            {/* Contact Information */}

            <div className="settings-section">

              <div className="settings-section-heading">

                <div className="settings-heading-icon">
                  <Globe size={19} />
                </div>

                <div>
                  <h2>
                    Organization Information
                  </h2>

                  <p>
                    Website and location details.
                  </p>
                </div>

              </div>


              {/* Website */}

              <div className="form-group">

                <label htmlFor="website">
                  Website
                </label>

                <div className="input-with-icon">

                  <Globe size={16} />

                  <input
                    id="website"
                    name="website"
                    type="text"
                    value={organization.website}
                    onChange={handleChange}
                    placeholder="https://example.com"
                  />

                </div>

              </div>


              {/* Location */}

              <div className="form-group">

                <label htmlFor="location">
                  Location
                </label>

                <div className="input-with-icon">

                  <MapPin size={16} />

                  <input
                    id="location"
                    name="location"
                    type="text"
                    value={organization.location}
                    onChange={handleChange}
                    placeholder="City, State, Country"
                  />

                </div>

              </div>

            </div>


            {/* Owner */}

            <div className="settings-section">

              <div className="settings-section-heading">

                <div className="settings-heading-icon">
                  <User size={19} />
                </div>

                <div>
                  <h2>
                    Organization Owner
                  </h2>

                  <p>
                    Current owner of the
                    organization.
                  </p>
                </div>

              </div>


              <div className="owner-display">

                <div className="owner-avatar">
                  {organization.owner.charAt(0)}
                </div>

                <div>
                  <strong>
                    {organization.owner}
                  </strong>

                  <span>
                    Organization Owner
                  </span>
                </div>

              </div>

            </div>


            {/* Footer */}

            <div className="settings-footer">

              {saved && (
                <span className="save-message">
                  Changes saved successfully.
                </span>
              )}

              <button
                type="submit"
                className="primary-button"
              >
                <Save size={16} />
                Save Changes
              </button>

            </div>

          </form>

        </main>

      </div>

    </div>
  );
}

export default OrganizationSettings;