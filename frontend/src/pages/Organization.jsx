import { useEffect, useState } from "react";
import { Building2, Globe, MapPin, Pencil, X } from "lucide-react";

import "../styles/departments.css";

import Header from "../components/Header";
import { getOrganization, updateOrganization } from "../api/organization";

function Organization() {
  const [organization, setOrganization] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const [profile] = useState({
    name: "yogita autade",
    designation: "engineer",
    email: "co2024.yogita.autade@ves.ac.in",
    image: null,
  });

  const loadOrganization = () => {
    setLoading(true);
    setError(null);

    getOrganization()
      .then((data) => setOrganization(data))
      .catch((err) => {
        console.error("Failed to load organization:", err);
        setError(err.response?.data?.message || "Failed to load company info.");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadOrganization();
  }, []);

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    setSaveError(null);
    const formData = new FormData(event.target);

    const locationsRaw = formData.get("locations") || "";
    const locations = locationsRaw
      .split(",")
      .map((loc) => loc.trim())
      .filter(Boolean);

    const payload = {
      name: formData.get("name"),
      description: formData.get("description"),
      website: formData.get("website"),
      industry: formData.get("industry"),
      logoUrl: formData.get("logoUrl"),
      locations,
    };

    try {
      setSaving(true);
      const updated = await updateOrganization(payload);
      setOrganization(updated);
      setShowEditModal(false);
    } catch (err) {
      console.error("Update organization failed:", err);
      setSaveError(err.response?.data?.message || "Failed to save changes.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="departments-page">
      <main className="main-content">
        <Header employees={[]} profile={profile} />

        <div className="page-content">
          <section className="page-header">
            <div>
              <p className="page-label">ORGANIZATION STRUCTURE</p>
              <h1>Organization</h1>
              <p className="page-subtitle">
                Manage your company's public identity and profile details.
              </p>
            </div>

            {organization && (
              <button className="create-button" onClick={() => setShowEditModal(true)}>
                <Pencil size={16} />
                Edit Company Information
              </button>
            )}
          </section>

          {loading && <p>Loading company info…</p>}

          {!loading && error && (
            <div className="empty-state">
              <h3>Couldn't load company info</h3>
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && organization && (
            <section className="dept-header-card">
              <div className="dept-header-top">
                <div className="dept-header-main">
                  <Building2 size={20} />
                  <h1>{organization.name}</h1>
                </div>
              </div>

              <p className="dept-header-description">
                {organization.description || "No description added yet."}
              </p>

              <div className="dept-header-meta">
                {organization.industry && (
                  <div className="meta-stat">
                    <Building2 size={15} />
                    {organization.industry}
                  </div>
                )}

                {organization.website && (
                  <div className="meta-stat">
                    <Globe size={15} />
                    {organization.website}
                  </div>
                )}

                {organization.locations?.length > 0 && (
                  <div className="meta-stat">
                    <MapPin size={15} />
                    {organization.locations.join(" • ")}
                  </div>
                )}
              </div>
            </section>
          )}
        </div>
      </main>

      {showEditModal && organization && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="department-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <p className="page-label">EDIT COMPANY INFORMATION</p>
                <h2>Update organization parameters and public identity</h2>
              </div>
              <button className="close-button" onClick={() => setShowEditModal(false)}>
                <X size={18} />
              </button>
            </div>

            <form className="department-form" onSubmit={handleEditSubmit}>
              <div className="form-group">
                <label>Company Name</label>
                <input name="name" type="text" defaultValue={organization.name} required />
              </div>

              <div className="form-group">
                <label>Company Short Description</label>
                <textarea
                  name="description"
                  rows="3"
                  defaultValue={organization.description}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Website URL</label>
                  <input name="website" type="text" defaultValue={organization.website} />
                </div>

                <div className="form-group">
                  <label>Industry</label>
                  <input name="industry" type="text" defaultValue={organization.industry} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Location / Offices</label>
                  <input
                    name="locations"
                    type="text"
                    placeholder="San Francisco, CA (HQ), London"
                    defaultValue={organization.locations?.join(", ")}
                  />
                </div>

                <div className="form-group">
                  <label>Logo URL</label>
                  <input name="logoUrl" type="text" defaultValue={organization.logoUrl} />
                </div>
              </div>

              {saveError && (
                <p style={{ color: "#b3413a", fontSize: "11px", marginBottom: "10px" }}>
                  {saveError}
                </p>
              )}

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="save-button" disabled={saving}>
                  {saving ? "Saving…" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Organization;