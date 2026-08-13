import { useEffect, useState } from "react";

import {
  Building2,
  ChevronRight,
  Globe,
  MapPin,
  MoreVertical,
  Pencil,
  Plus,
  Search,
  TrendingUp,
  Users,
  UsersRound,
  Wallet,
  X,
} from "lucide-react";

import "../styles/departments.css";

import DepartmentDetail from "./DepartmentDetail";
import Header from "../components/Header";

import {
  getDepartments,
  createDepartment,
  getDashboardStats,
} from "../api/departments";

import {
  getOrganization,
  updateOrganization,
} from "../api/organization";


/* =========================================================
   HELPERS
========================================================= */

const formatCurrency = (num) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(num || 0);


const THEME_TO_CARD_TYPE = {
  indigo: "brown",
  brown: "brown",
  tan: "tan",
  gold: "tan",
  green: "green",
  emerald: "green",
};


const getCardType = (themeColor) =>
  THEME_TO_CARD_TYPE[(themeColor || "").toLowerCase()] || "brown";


/* =========================================================
   DEPARTMENTS PAGE
========================================================= */

function Departments() {
  const [departments, setDepartments] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [stats, setStats] = useState({
    totalDepartments: 0,
    totalEmployees: 0,
    totalTeams: 0,
    allocatedBudget: 0,
  });

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [sortBy, setSortBy] = useState("name");

  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState(null);

  const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);


  /* =========================================================
     ORGANIZATION / COMPANY INFO
  ========================================================= */

  const [organization, setOrganization] = useState(null);

  const [orgLoading, setOrgLoading] = useState(true);

  const [showOrgEditModal, setShowOrgEditModal] = useState(false);

  const [orgSaving, setOrgSaving] = useState(false);

  const [orgSaveError, setOrgSaveError] = useState(null);


  /* =========================================================
     PROFILE
  ========================================================= */

  const [profile] = useState({
    name: "yogita autade",
    designation: "engineer",
    email: "co2024.yogita.autade@ves.ac.in",
    image: null,
  });


  /* =========================================================
     LOAD DEPARTMENTS
  ========================================================= */

  const loadDepartments = async () => {
    try {
      setLoading(true);
      setError(null);

      const [departmentList, dashboardStats] = await Promise.all([
        getDepartments(),
        getDashboardStats(),
      ]);

      setDepartments(
        Array.isArray(departmentList)
          ? departmentList
          : departmentList?.departments || []
      );

      setStats(
        dashboardStats?.stats ||
          dashboardStats || {
            totalDepartments: 0,
            totalEmployees: 0,
            totalTeams: 0,
            allocatedBudget: 0,
          }
      );
    } catch (err) {
      console.error("Failed to load departments:", err);
      console.error("Backend response:", err.response?.data);

      setError(
        err.response?.data?.message ||
          "Could not load departments. Is the backend running?"
      );
    } finally {
      setLoading(false);
    }
  };


  /* =========================================================
     LOAD ORGANIZATION
  ========================================================= */

  const loadOrganization = () => {
    setOrgLoading(true);

    getOrganization()
      .then((data) => {
        setOrganization(data);
      })
      .catch((err) => {
        console.error("Failed to load organization:", err);
      })
      .finally(() => {
        setOrgLoading(false);
      });
  };


  /* =========================================================
     INITIAL LOAD
  ========================================================= */

  useEffect(() => {
    loadDepartments();
    loadOrganization();
  }, []);


  /* =========================================================
     FILTER + SORT
  ========================================================= */

  const filteredDepartments = departments
    .filter((department) => {
      const searchText = search.toLowerCase().trim();

      return (
        department.name?.toLowerCase().includes(searchText) ||
        department.managerTitle?.toLowerCase().includes(searchText) ||
        department.code?.toLowerCase().includes(searchText) ||
        department.description?.toLowerCase().includes(searchText)
      );
    })
    .sort((a, b) => {
      if (sortBy === "budget") {
        return (b.budget || 0) - (a.budget || 0);
      }

      return (a.name || "").localeCompare(b.name || "");
    });


  /* =========================================================
     CREATE DEPARTMENT
  ========================================================= */

  const handleCreateDepartment = async (event) => {
    event.preventDefault();

    setCreateError(null);

    const formData = new FormData(event.target);

    const payload = {
      name: formData.get("name")?.trim() || "",

      code:
        formData.get("code")?.trim().toUpperCase() || "",

      description:
        formData.get("description")?.trim() || "",

      managerTitle:
        formData.get("managerTitle")?.trim() ||
        "Department Head",

      budget:
        Number(
          String(formData.get("budget") || "").replace(
            /[^0-9.]/g,
            ""
          )
        ) || 0,
    };

    try {
      setCreating(true);

      await createDepartment(payload);

      setShowModal(false);

      event.target.reset();

      await loadDepartments();
    } catch (err) {
      console.error("Create department failed:", err);
      console.error("Backend response:", err.response?.data);

      setCreateError(
        err.response?.data?.message ||
          "Failed to create department."
      );
    } finally {
      setCreating(false);
    }
  };


  /* =========================================================
     UPDATE COMPANY INFORMATION
  ========================================================= */

  const handleOrgEditSubmit = async (event) => {
    event.preventDefault();

    setOrgSaveError(null);

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
      setOrgSaving(true);

      const updated = await updateOrganization(payload);

      setOrganization(updated);

      setShowOrgEditModal(false);
    } catch (err) {
      console.error("Update organization failed:", err);

      setOrgSaveError(
        err.response?.data?.message ||
          "Failed to save changes."
      );
    } finally {
      setOrgSaving(false);
    }
  };


  /* =========================================================
     DEPARTMENT DETAIL PAGE
  ========================================================= */

  if (selectedDepartmentId) {
    return (
      <DepartmentDetail
        departmentId={selectedDepartmentId}
        onBack={() => {
          setSelectedDepartmentId(null);
          loadDepartments();
        }}
      />
    );
  }


  /* =========================================================
     MAIN UI
  ========================================================= */

  return (
    <div className="departments-page">

      <main className="main-content">

        <Header
          employees={[]}
          profile={profile}
          onProfileSettings={() => {
            console.log("Profile Settings clicked");
          }}
          onSecurityAudit={() => {
            console.log("Security & Audit clicked");
          }}
        />


        <div className="page-content">


          {/* =================================================
              COMPANY INFORMATION
          ================================================= */}

          {!orgLoading && organization && (
            <section className="dept-header-card">

              <div className="dept-header-top">

                <div className="dept-header-main">

                  <Building2 size={20} />

                  <h1>{organization.name}</h1>

                </div>


                <div className="dept-header-actions">

                  <button
                    className="edit-department-btn"
                    onClick={() =>
                      setShowOrgEditModal(true)
                    }
                  >
                    <Pencil size={14} />

                    Edit Company Information
                  </button>

                </div>

              </div>


              <p className="dept-header-description">
                {organization.description ||
                  "No description added yet."}
              </p>


              <div className="dept-header-meta">

                {organization.industry && (
                  <div className="meta-stat">

                    <Building2 size={15} />

                    <span>
                      {organization.industry}
                    </span>

                  </div>
                )}


                {organization.website && (
                  <div className="meta-stat">

                    <Globe size={15} />

                    <span>
                      {organization.website}
                    </span>

                  </div>
                )}


                {organization.locations?.length > 0 && (
                  <div className="meta-stat">

                    <MapPin size={15} />

                    <span>
                      {organization.locations.join(" • ")}
                    </span>

                  </div>
                )}

              </div>

            </section>
          )}


          {/* ERROR */}

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}


          {/* =================================================
              STATISTICS
          ================================================= */}

          <section className="stats-grid">

            <StatCard
              title="TOTAL DEPARTMENTS"
              value={stats.totalDepartments}
              description="Fully active departments"
              trend="Live from backend"
              icon={<Building2 size={18} />}
            />

            <StatCard
              title="TOTAL EMPLOYEES"
              value={stats.totalEmployees}
              description="Across all departments"
              trend="Live from backend"
              icon={<Users size={18} />}
            />

            <StatCard
              title="ACTIVE TEAMS"
              value={stats.totalTeams}
              description="Currently operating"
              trend="Live from backend"
              icon={<UsersRound size={18} />}
            />

            <StatCard
              title="ALLOCATED BUDGET"
              value={formatCurrency(
                stats.allocatedBudget
              )}
              description="Annual department budget"
              trend="Live from backend"
              icon={<Wallet size={18} />}
            />

          </section>


          {/* =================================================
              DEPARTMENTS
          ================================================= */}

          <section className="department-section">

            <div className="section-header">


              {/* TITLE */}

              <div className="section-title">

                <div className="section-title-main">

                  <Building2 size={18} />

                  <h2>Departments</h2>

                  <span>
                    {filteredDepartments.length} Active
                  </span>

                </div>

                <p>
                  View and manage all departments.
                </p>

              </div>


              {/* TOOLS */}

              <div className="department-tools">

                <div className="filter-search">

                  <Search size={15} />

                  <input
                    type="text"
                    placeholder="Filter departments..."
                    value={search}
                    onChange={(event) =>
                      setSearch(event.target.value)
                    }
                  />

                </div>


                <select
                  value={sortBy}
                  onChange={(event) =>
                    setSortBy(event.target.value)
                  }
                >
                  <option value="name">
                    Sort by Name
                  </option>

                  <option value="budget">
                    Sort by Budget
                  </option>
                </select>


                <button
                  className="small-create-button"
                  onClick={() => {
                    setCreateError(null);
                    setShowModal(true);
                  }}
                >
                  <Plus size={15} />

                  Create
                </button>

              </div>

            </div>


            {/* LOADING */}

            {loading && (
              <div className="empty-state">
                <p>Loading departments…</p>
              </div>
            )}


            {/* ERROR */}

            {!loading && error && (
              <div className="empty-state">

                <h3>
                  Couldn't load departments
                </h3>

                <p>{error}</p>

              </div>
            )}


            {/* DEPARTMENT CARDS */}

            {!loading &&
              !error &&
              filteredDepartments.length > 0 && (

                <div className="departments-grid">

                  {filteredDepartments.map(
                    (department) => (

                      <DepartmentCard
                        key={department._id}
                        department={department}
                        onViewDetails={() =>
                          setSelectedDepartmentId(
                            department._id
                          )
                        }
                      />

                    )
                  )}

                </div>
              )}


            {/* EMPTY */}

            {!loading &&
              !error &&
              filteredDepartments.length === 0 && (

                <div className="empty-state">

                  <Search size={30} />

                  <h3>
                    No departments found
                  </h3>

                  <p>
                    Try searching for another department,
                    or create one.
                  </p>

                </div>
              )}

          </section>

        </div>

      </main>


      {/* =====================================================
          CREATE DEPARTMENT MODAL
      ===================================================== */}

      {showModal && (

        <div
          className="modal-overlay"
          onClick={() => {
            if (!creating) {
              setShowModal(false);
            }
          }}
        >

          <div
            className="department-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="modal-header">

              <div>

                <p className="page-label">
                  NEW DEPARTMENT
                </p>

                <h2>
                  Create Department
                </h2>

              </div>


              <button
                className="close-button"
                disabled={creating}
                onClick={() =>
                  setShowModal(false)
                }
              >
                <X size={18} />
              </button>

            </div>


            <form
              className="department-form"
              onSubmit={handleCreateDepartment}
            >

              <div className="form-row">

                <div className="form-group">

                  <label>
                    Department Name
                  </label>

                  <input
                    name="name"
                    type="text"
                    placeholder="Engineering"
                    required
                  />

                </div>


                <div className="form-group">

                  <label>
                    Short Code
                  </label>

                  <input
                    name="code"
                    type="text"
                    placeholder="ENG"
                    maxLength="5"
                  />

                </div>

              </div>


              <div className="form-group">

                <label>
                  Description
                </label>

                <textarea
                  name="description"
                  rows="3"
                  placeholder="Describe the department..."
                />

              </div>


              <div className="form-row">

                <div className="form-group">

                  <label>
                    Manager Title
                  </label>

                  <input
                    name="managerTitle"
                    type="text"
                    placeholder="VP of Engineering"
                  />

                </div>


                <div className="form-group">

                  <label>
                    Annual Budget
                  </label>

                  <input
                    name="budget"
                    type="text"
                    placeholder="$500,000"
                  />

                </div>

              </div>


              {createError && (
                <p className="form-error">
                  {createError}
                </p>
              )}


              <div className="modal-actions">

                <button
                  type="button"
                  className="cancel-button"
                  disabled={creating}
                  onClick={() =>
                    setShowModal(false)
                  }
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  className="save-button"
                  disabled={creating}
                >
                  <Plus size={16} />

                  {creating
                    ? "Creating…"
                    : "Create Department"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}


      {/* =====================================================
          EDIT COMPANY INFORMATION MODAL
      ===================================================== */}

      {showOrgEditModal && organization && (

        <div
          className="modal-overlay"
          onClick={() =>
            setShowOrgEditModal(false)
          }
        >

          <div
            className="department-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="modal-header">

              <div>

                <p className="page-label">
                  EDIT COMPANY INFORMATION
                </p>

                <h2>
                  Update company information
                </h2>

              </div>


              <button
                className="close-button"
                onClick={() =>
                  setShowOrgEditModal(false)
                }
              >
                <X size={18} />
              </button>

            </div>


            <form
              className="department-form"
              onSubmit={handleOrgEditSubmit}
            >

              <div className="form-group">

                <label>
                  Company Name
                </label>

                <input
                  name="name"
                  type="text"
                  defaultValue={organization.name}
                  required
                />

              </div>


              <div className="form-group">

                <label>
                  Company Short Description
                </label>

                <textarea
                  name="description"
                  rows="3"
                  defaultValue={
                    organization.description
                  }
                />

              </div>


              <div className="form-row">

                <div className="form-group">

                  <label>
                    Website URL
                  </label>

                  <input
                    name="website"
                    type="text"
                    defaultValue={
                      organization.website
                    }
                  />

                </div>


                <div className="form-group">

                  <label>
                    Industry
                  </label>

                  <input
                    name="industry"
                    type="text"
                    defaultValue={
                      organization.industry
                    }
                  />

                </div>

              </div>


              <div className="form-row">

                <div className="form-group">

                  <label>
                    Location / Offices
                  </label>

                  <input
                    name="locations"
                    type="text"
                    placeholder="San Francisco, CA (HQ), London"
                    defaultValue={
                      organization.locations?.join(
                        ", "
                      )
                    }
                  />

                </div>


                <div className="form-group">

                  <label>
                    Logo URL
                  </label>

                  <input
                    name="logoUrl"
                    type="text"
                    defaultValue={
                      organization.logoUrl
                    }
                  />

                </div>

              </div>


              {orgSaveError && (
                <p className="form-error">
                  {orgSaveError}
                </p>
              )}


              <div className="modal-actions">

                <button
                  type="button"
                  className="cancel-button"
                  onClick={() =>
                    setShowOrgEditModal(false)
                  }
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  className="save-button"
                  disabled={orgSaving}
                >
                  {orgSaving
                    ? "Saving…"
                    : "Save Changes"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}


/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  title,
  value,
  description,
  trend,
  icon,
}) {
  return (
    <div className="stat-card">

      <div className="stat-top">

        <div className="stat-icon">
          {icon}
        </div>

        <span>
          {title}
        </span>

      </div>


      <h3>
        {value}
      </h3>


      <div className="stat-bottom">

        <p>
          {description}
        </p>

        <span className="trend">

          <TrendingUp size={11} />

          {trend}

        </span>

      </div>

    </div>
  );
}


/* =========================================================
   DEPARTMENT CARD
========================================================= */

function DepartmentCard({
  department,
  onViewDetails,
}) {
  return (
    <article
      className={`department-card ${getCardType(
        department.themeColor
      )}`}
    >

      <div className="card-accent" />


      <div className="department-card-body">

        <div className="department-card-header">

          <div className="department-code">
            {department.code || "—"}
          </div>


          <div className="department-title">

            <h3>
              {department.name}
            </h3>

            <span>

              <Users size={12} />

              {department.managerTitle ||
                "Department Head"}

            </span>

          </div>


          <button
            type="button"
            className="more-button"
          >
            <MoreVertical size={17} />
          </button>

        </div>


        <p className="department-description">
          {department.description ||
            "No description added yet."}
        </p>


        <div className="department-card-footer">

          <div className="budget">

            <span>
              ANNUAL BUDGET
            </span>

            <strong>
              {formatCurrency(
                department.budget
              )}
            </strong>

          </div>


          <button
            type="button"
            className="details-button"
            onClick={onViewDetails}
          >
            View Details

            <ChevronRight size={14} />
          </button>

        </div>

      </div>

    </article>
  );
}


export default Departments;