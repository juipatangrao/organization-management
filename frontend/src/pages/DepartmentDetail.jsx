import { useEffect, useState } from "react";

import {
  ArrowLeft,
  ChevronRight,
  Pencil,
  Trash2,
  Users,
  Layers,
  DollarSign,
  FileText,
  X,
  Activity,
  UserRound,
} from "lucide-react";

import "../styles/department-detail.css";
import "../styles/departments.css";

import {
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
  getDepartmentMembers,
  addDepartmentMember,
  removeDepartmentMember,
  getDepartmentTeams,
  createDepartmentTeam,
  updateDepartmentTeam,
  deleteDepartmentTeam,
  getDepartmentAuditLogs,
} from "../api/departments";

const TABS = ["Overview", "Members", "Teams", "Activity Audit Log"];

const formatCurrency = (num) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(num || 0);

function DepartmentDetail({ departmentId, onBack }) {
  const [department, setDepartment] = useState(null);

  const [statistics, setStatistics] = useState({
    totalEmployees: 0,
    totalTeams: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeTab, setActiveTab] = useState("Overview");

  const [showEditModal, setShowEditModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [members, setMembers] = useState(null);
  const [teams, setTeams] = useState(null);
  const [auditLogs, setAuditLogs] = useState(null);

  const [tabLoading, setTabLoading] = useState(false);

  // Team states
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [editingTeam, setEditingTeam] = useState(null);
  const [teamSaving, setTeamSaving] = useState(false);

  // Add member states
  const [newMemberUserId, setNewMemberUserId] = useState("");
  const [addingMember, setAddingMember] = useState(false);

  // --------------------------------------------------
  // LOAD DEPARTMENT
  // --------------------------------------------------

  const loadDepartment = async () => {
    try {
      setLoading(true);
      setError(null);

      const { department, statistics } =
        await getDepartmentById(departmentId);

      setDepartment(department);

      setStatistics(
        statistics || {
          totalEmployees: 0,
          totalTeams: 0,
        }
      );
    } catch (err) {
      console.error("Failed to load department:", err);

      setError(
        err.response?.data?.message ||
          "Failed to load department."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDepartment();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [departmentId]);

  // --------------------------------------------------
  // LOAD TAB DATA
  // --------------------------------------------------

  useEffect(() => {
    if (activeTab === "Members" && members === null) {
      setTabLoading(true);

      getDepartmentMembers(departmentId)
        .then((data) => {
          console.log("Members loaded:", data);

          setMembers(Array.isArray(data) ? data : []);
        })
        .catch((err) => {
          console.error("Failed to load members:", err);
          setMembers([]);
        })
        .finally(() => {
          setTabLoading(false);
        });
    }

    if (activeTab === "Teams") {
      setTabLoading(true);

      getDepartmentTeams(departmentId)
        .then((data) => {
          setTeams(Array.isArray(data) ? data : []);
        })
        .catch((err) => {
          console.error("Failed to load teams:", err);
          setTeams([]);
        })
        .finally(() => {
          setTabLoading(false);
        });
    }

    if (
      activeTab === "Activity Audit Log" &&
      auditLogs === null
    ) {
      setTabLoading(true);

      getDepartmentAuditLogs(departmentId)
        .then((data) => {
          setAuditLogs(data.logs || []);
        })
        .catch((err) => {
          console.error("Failed to load audit logs:", err);
          setAuditLogs([]);
        })
        .finally(() => {
          setTabLoading(false);
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, departmentId]);

  // --------------------------------------------------
  // EDIT DEPARTMENT
  // --------------------------------------------------

  const handleEditSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const payload = {
      name: formData.get("name"),
      description: formData.get("description"),
      managerTitle: formData.get("managerTitle"),
      budget:
        Number(
          String(formData.get("budget")).replace(
            /[^0-9.]/g,
            ""
          )
        ) || 0,
    };

    try {
      setSaving(true);

      await updateDepartment(departmentId, payload);

      setShowEditModal(false);

      await loadDepartment();
    } catch (err) {
      console.error("Update failed:", err);

      alert(
        err.response?.data?.message ||
          "Failed to update department."
      );
    } finally {
      setSaving(false);
    }
  };

  // --------------------------------------------------
  // DELETE DEPARTMENT
  // --------------------------------------------------

  const handleDelete = async () => {
    if (
      !window.confirm(
        `Delete "${department.name}" and all its teams/members? This cannot be undone.`
      )
    ) {
      return;
    }

    try {
      setDeleting(true);

      await deleteDepartment(departmentId);

      onBack();
    } catch (err) {
      console.error("Delete failed:", err);

      alert(
        err.response?.data?.message ||
          "Failed to delete department."
      );

      setDeleting(false);
    }
  };

  // --------------------------------------------------
  // TEAM CRUD
  // --------------------------------------------------

  const refreshTeams = async () => {
    try {
      setTabLoading(true);
      const refreshedTeams = await getDepartmentTeams(departmentId);
      setTeams(Array.isArray(refreshedTeams) ? refreshedTeams : []);
      await loadDepartment();
    } catch (err) {
      console.error("Failed to refresh teams:", err);
      setTeams([]);
    } finally {
      setTabLoading(false);
    }
  };

  const handleCreateOrUpdateTeam = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const payload = {
      name: formData.get("teamName")?.trim() || "",
      description: formData.get("teamDescription")?.trim() || "",
    };

    if (!payload.name) {
      alert("Please enter a team name.");
      return;
    }

    try {
      setTeamSaving(true);

      if (editingTeam) {
        await updateDepartmentTeam(
          departmentId,
          editingTeam._id,
          payload
        );
      } else {
        await createDepartmentTeam(departmentId, payload);
      }

      setShowTeamModal(false);
      setEditingTeam(null);

      // Important: GET the teams again after POST/PUT so the newly-created
      // team is immediately rendered in the Teams tab.
      await refreshTeams();
    } catch (err) {
      console.error("Team save failed:", err);
      console.error("Backend response:", err.response?.data);
      alert(
        err.response?.data?.message ||
          `Failed to ${editingTeam ? "update" : "create"} team.`
      );
    } finally {
      setTeamSaving(false);
    }
  };

  const handleDeleteTeam = async (team) => {
    if (!team?._id) return;

    if (!window.confirm(`Delete "${team.name}"?`)) return;

    try {
      await deleteDepartmentTeam(departmentId, team._id);
      await refreshTeams();
    } catch (err) {
      console.error("Team delete failed:", err);
      alert(
        err.response?.data?.message ||
          "Failed to delete team."
      );
    }
  };

  const openCreateTeam = () => {
    setEditingTeam(null);
    setShowTeamModal(true);
  };

  const openEditTeam = (team) => {
    setEditingTeam(team);
    setShowTeamModal(true);
  };

  // --------------------------------------------------
  // ADD MEMBER
  // --------------------------------------------------

  const handleAddMember = async (event) => {
    event.preventDefault();

    console.log("🔥 ADD MEMBER BUTTON CLICKED");

    const userId = newMemberUserId.trim();

    // Prevent empty submission
    if (!userId) {
      alert("Please enter a User ID.");
      return;
    }

    try {
      setAddingMember(true);

      console.log("Adding member:", {
        departmentId,
        userId,
        role: "employee",
      });

      await addDepartmentMember(departmentId, {
        userId: userId,
        role: "employee",
      });

      console.log("✅ Member added successfully");

      // Clear input
      setNewMemberUserId("");

      // Reload members
      const refreshedMembers =
        await getDepartmentMembers(departmentId);

      setMembers(
        Array.isArray(refreshedMembers)
          ? refreshedMembers
          : []
      );

      // Refresh department statistics
      await loadDepartment();

      alert("Member added successfully!");
    } catch (err) {
      console.error("❌ Add member failed:", err);
      console.error(
        "❌ Backend response:",
        err.response?.data
      );

      alert(
        err.response?.data?.message ||
          "Failed to add member."
      );
    } finally {
      setAddingMember(false);
    }
  };

  // --------------------------------------------------
  // REMOVE MEMBER
  // --------------------------------------------------

  const handleRemoveMember = async (userId) => {
    if (!userId) {
      alert("User ID not found.");
      return;
    }

    try {
      await removeDepartmentMember(
        departmentId,
        userId
      );

      setMembers((current) =>
        (current || []).filter(
          (member) =>
            member.userId?._id !== userId &&
            member.userId !== userId
        )
      );

      // Refresh statistics
      await loadDepartment();

      alert("Member removed successfully!");
    } catch (err) {
      console.error("Remove member failed:", err);

      alert(
        err.response?.data?.message ||
          "Failed to remove member."
      );
    }
  };

  // --------------------------------------------------
  // LOADING
  // --------------------------------------------------

  if (loading) {
    return (
      <div className="dept-detail-page">
        <p>Loading department…</p>
      </div>
    );
  }

  // --------------------------------------------------
  // ERROR
  // --------------------------------------------------

  if (error || !department) {
    return (
      <div className="dept-detail-page">
        <button
          className="back-button"
          onClick={onBack}
        >
          <ArrowLeft size={15} />
          Back to Departments
        </button>

        <p style={{ color: "#b3413a" }}>
          {error || "Department not found."}
        </p>
      </div>
    );
  }

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <div className="dept-detail-page">

      {/* BREADCRUMB */}

      <div className="dept-detail-breadcrumb">
        <span>Organization</span>

        <ChevronRight size={13} />

        <span
          onClick={onBack}
          className="breadcrumb-link"
        >
          Departments
        </span>

        <ChevronRight size={13} />

        <strong>{department.name}</strong>
      </div>

      {/* BACK BUTTON */}

      <button
        className="back-button"
        onClick={onBack}
      >
        <ArrowLeft size={15} />
        Back to Departments
      </button>

      {/* DEPARTMENT HEADER */}

      <section className="dept-header-card">

        <div className="dept-header-top">

          <div className="dept-header-main">

            <span className="dept-code-badge">
              {department.code || "—"}
            </span>

            <h1>
              {department.name}
            </h1>

          </div>

          <div className="dept-header-actions">

            <button
              className="edit-department-btn"
              onClick={() =>
                setShowEditModal(true)
              }
            >
              <Pencil size={14} />
              Edit Department
            </button>

            <button
              className="delete-department-btn"
              onClick={handleDelete}
              disabled={deleting}
            >
              <Trash2 size={14} />

              {deleting
                ? "Deleting…"
                : "Delete"}
            </button>

          </div>
        </div>

        <p className="dept-header-description">
          {department.description ||
            "No description added yet."}
        </p>

        <div className="dept-header-meta">

          <div className="meta-stat">
            <Users size={15} />
            {department.managerTitle ||
              "Department Head"}
          </div>

          <div className="meta-stat">
            <Users size={15} />
            {statistics.totalEmployees} Members
          </div>

          <div className="meta-stat">
            <Layers size={15} />
            {statistics.totalTeams} Active Teams
          </div>

          <div className="meta-stat">
            <DollarSign size={15} />
            {formatCurrency(
              department.budget
            )}
          </div>

        </div>
      </section>

      {/* TABS */}

      <div className="dept-tabs">

        {TABS.map((tab) => (
          <button
            key={tab}
            className={`dept-tab ${
              activeTab === tab
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActiveTab(tab)
            }
          >
            {tab === "Members"
              ? `Members (${statistics.totalEmployees})`
              : tab === "Teams"
                ? `Teams (${statistics.totalTeams})`
                : tab}
          </button>
        ))}

      </div>

      {/* ================================================= */}
      {/* OVERVIEW */}
      {/* ================================================= */}

      {activeTab === "Overview" && (
        <div className="dept-overview-grid">

          <div className="dept-overview-left">

            <div className="dept-charter-card">

              <div className="dept-charter-title">

                <FileText size={16} />

                <h3>
                  Department Charter & Strategic Mission
                </h3>

              </div>

              <p>
                {department.description ||
                  "No description added yet."}
              </p>

            </div>

            <div className="dept-stats-row">

              <div className="dept-mini-stat">
                <span>TOTAL MEMBERS</span>
                <strong>
                  {statistics.totalEmployees}
                </strong>
              </div>

              <div className="dept-mini-stat">
                <span>ACTIVE TEAMS</span>
                <strong>
                  {statistics.totalTeams}
                </strong>
              </div>

              <div className="dept-mini-stat">
                <span>ANNUAL BUDGET</span>
                <strong>
                  {formatCurrency(
                    department.budget
                  )}
                </strong>
              </div>

            </div>

          </div>

          <div className="dept-overview-right">

            <div className="dept-leadership-card">

              <span className="dept-leadership-label">
                DEPARTMENT LEADERSHIP
              </span>

              <div className="leadership-person">

                <div>

                  <strong>
                    {department.managerTitle ||
                      "Department Head"}
                  </strong>

                  <span>
                    {department.headId
                      ? `Assigned (ID: ${department.headId})`
                      : "Not yet assigned"}
                  </span>

                </div>

              </div>

              <p
                style={{
                  fontSize: "10px",
                  color: "#9c8d82",
                }}
              >
                Head names require a User directory
                service — this backend only stores the
                head's ID reference.
              </p>

            </div>

            <div className="dept-activity-card">

              <div className="dept-activity-header">

                <strong>
                  Recent Activity
                </strong>

                <span
                  className="full-log-link"
                  onClick={() =>
                    setActiveTab(
                      "Activity Audit Log"
                    )
                  }
                >
                  Full Log
                </span>

              </div>

              <div className="activity-empty">
                Open the Activity Audit Log tab to view
                history.
              </div>

            </div>

          </div>

        </div>
      )}

      {/* ================================================= */}
      {/* MEMBERS */}
      {/* ================================================= */}

      {activeTab === "Members" && (
        <div
          className="dept-tab-placeholder"
          style={{ textAlign: "left" }}
        >

          {/* ADD MEMBER FORM */}

          <form
            onSubmit={handleAddMember}
            className="add-member-form"
          >

            <input
              type="text"
              placeholder="Enter User ID to add as member"
              value={newMemberUserId}
              onChange={(event) =>
                setNewMemberUserId(
                  event.target.value
                )
              }
              disabled={addingMember}
              className="add-member-input"
            />

            <button
              type="submit"
              className="add-member-button"
              disabled={addingMember}
            >
              {addingMember
                ? "Adding..."
                : "Add Member"}
            </button>

          </form>

          {/* LOADING */}

          {tabLoading && (
            <p>Loading members…</p>
          )}

          {/* EMPTY */}

          {!tabLoading &&
            members?.length === 0 && (
              <p
                style={{
                  color: "#9c8d82",
                }}
              >
                No members in this department yet.
              </p>
            )}

          {/* MEMBERS LIST */}

          {!tabLoading &&
            members?.map((member) => {

              const memberUserId =
                member.userId?._id ||
                member.userId;

              return (
                <div
                  key={member._id}
                  style={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    alignItems: "center",
                    padding: "12px 0",
                    borderBottom:
                      "1px solid #eee7e2",
                  }}
                >

                  <div>

                    <strong
                      style={{
                        fontSize: "12px",
                      }}
                    >
                      {member.userId?.name ||
                        member.userId?._id ||
                        member.userId ||
                        "Unknown User"}
                    </strong>

                    <div
                      style={{
                        fontSize: "10px",
                        color: "#9c8d82",
                      }}
                    >
                      {member.userId?.email ||
                        "—"}{" "}
                      · {member.role} ·{" "}
                      {member.status}
                    </div>

                  </div>

                  <button
                    type="button"
                    className="delete-department-btn"
                    onClick={() =>
                      handleRemoveMember(
                        memberUserId
                      )
                    }
                  >
                    <X size={13} />
                    Remove
                  </button>

                </div>
              );
            })}

        </div>
      )}

      {/* ================================================= */}
      {/* TEAMS */}
      {/* ================================================= */}

      {activeTab === "Teams" && (
        <div className="teams-page-section">
          <div className="teams-page-header">
            <div>
              <h2>Department Sub-Teams</h2>
              <p>Cross-functional squads inside {department.name}</p>
            </div>

            <button
              type="button"
              className="create-team-button"
              onClick={openCreateTeam}
            >
              + Create Team
            </button>
          </div>

          {tabLoading && <p className="teams-message">Loading teams…</p>}

          {!tabLoading && teams?.length === 0 && (
            <div className="teams-empty">
              <strong>No teams in this department yet.</strong>
              <span>Create your first sub-team using the button above.</span>
            </div>
          )}

          {!tabLoading && teams?.length > 0 && (
            <div className="teams-grid">
              {teams.map((team) => (
                <div className="team-card" key={team._id}>
                  <div className="team-card-heading">
                    <div>
                      <div className="team-title-row">
                        <h3>{team.name}</h3>
                        <span className="team-status">
                          {team.status || "active"}
                        </span>
                      </div>
                      <p>{team.description || "No description"}</p>
                    </div>

                    <div className="team-card-actions">
                      <button type="button" onClick={() => openEditTeam(team)} title="Edit team">
                        <Pencil size={14} />
                      </button>
                      <button type="button" onClick={() => handleDeleteTeam(team)} title="Delete team">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="team-focus-row">
                    <Layers size={14} />
                    <span>Focus:</span>
                    <strong>{team.focus || team.projectFocus || "Team operations"}</strong>
                  </div>

                  <div className="team-card-footer">
                    <div>
                      <strong>
                        {team.teamLead?.name ||
                          team.lead?.name ||
                          team.leadId?.name ||
                          "Team Lead"}
                      </strong>
                      <small>Team Lead</small>
                    </div>
                    <span>
                      {team.memberCount ?? team.members?.length ?? 0} Members
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ================================================= */}
{/* AUDIT LOG */}
{/* ================================================= */}

{activeTab === "Activity Audit Log" && (
  <div className="audit-log-page">

    <div className="audit-log-card">

      {/* HEADER */}
      <div className="audit-log-header">
        <div>
          <div className="audit-log-title-row">
            <Activity size={18} />
            <h2>Audit & Activity Timeline</h2>
          </div>

          <p>
            Historical trail of changes, personnel moves, and updates
          </p>
        </div>

        <span className="audit-event-count">
          {auditLogs?.length || 0} Events
        </span>
      </div>

      {/* LOADING */}
      {tabLoading && (
        <div className="audit-loading">
          Loading activity…
        </div>
      )}

      {/* EMPTY */}
      {!tabLoading && auditLogs?.length === 0 && (
        <div className="audit-empty">
          <Activity size={24} />
          <strong>No activity recorded yet.</strong>
          <span>
            Department changes and team activity will appear here.
          </span>
        </div>
      )}

      {/* TIMELINE */}
      {!tabLoading && auditLogs?.length > 0 && (
        <div className="audit-timeline">

          {auditLogs.map((log) => {

            const action = String(
              log.action || "ACTIVITY"
            );

            const actionUpper = action
              .replace(/_/g, " ")
              .toUpperCase();

            const actionType = action
              .toLowerCase()
              .replace(/_/g, " ");

            const performer =
              log.performedBy?.name ||
              log.performedBy?.email ||
              log.performedByName ||
              "System";

            const performerRole =
              log.performedBy?.role ||
              log.performedByRole ||
              "System Activity";

            const description =
              log.details ||
              log.description ||
              `${actionType} was performed in ${department.name}.`;

            const date = log.createdAt
              ? new Date(log.createdAt).toLocaleString("en-US", {
                  month: "numeric",
                  day: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                })
              : "—";

            const initials = performer
              .split(" ")
              .filter(Boolean)
              .slice(0, 2)
              .map((part) => part[0])
              .join("")
              .toUpperCase();

            return (
              <div
                className="audit-timeline-item"
                key={log._id}
              >

                {/* TIMELINE DOT */}
                <div className="audit-timeline-dot" />

                {/* EVENT CARD */}
                <div className="audit-event-card">

                  <div className="audit-event-top">

                    <div className="audit-event-heading">

                      <span className="audit-event-badge">
                        {actionUpper}
                      </span>

                      <h3>
                        {log.title ||
                          log.eventTitle ||
                          actionUpper
                            .toLowerCase()
                            .replace(/\b\w/g, (letter) =>
                              letter.toUpperCase()
                            )}
                      </h3>

                    </div>

                    <span className="audit-event-date">
                      {date}
                    </span>

                  </div>

                  <p className="audit-event-description">
                    {description}
                  </p>

                  <div className="audit-event-divider" />

                  <div className="audit-performer">

                    <div className="audit-avatar">
                      {initials || <UserRound size={14} />}
                    </div>

                    <span className="audit-performed-by">
                      Performed by:
                    </span>

                    <strong>{performer}</strong>

                    <span className="audit-performer-role">
                      ({performerRole})
                    </span>

                  </div>

                </div>
              </div>
            );
          })}

        </div>
      )}

    </div>
  </div>
)}

      {/* ================================================= */}
      {/* CREATE / EDIT TEAM MODAL */}
      {/* ================================================= */}

      {showTeamModal && (
        <div
          className="modal-overlay"
          onClick={() => {
            if (!teamSaving) {
              setShowTeamModal(false);
              setEditingTeam(null);
            }
          }}
        >
          <div
            className="department-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <p className="page-label">
                  {editingTeam ? "EDIT TEAM" : "CREATE TEAM"}
                </p>
                <h2>{editingTeam ? editingTeam.name : "New Department Team"}</h2>
              </div>
              <button
                type="button"
                className="close-button"
                onClick={() => {
                  setShowTeamModal(false);
                  setEditingTeam(null);
                }}
              >
                <X size={18} />
              </button>
            </div>

            <form className="department-form" onSubmit={handleCreateOrUpdateTeam}>
              <div className="form-group">
                <label>Team Name</label>
                <input
                  name="teamName"
                  type="text"
                  defaultValue={editingTeam?.name || ""}
                  placeholder="e.g. Core Platform"
                  required
                  autoFocus
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="teamDescription"
                  rows="4"
                  defaultValue={editingTeam?.description || ""}
                  placeholder="Describe what this team is responsible for"
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => {
                    setShowTeamModal(false);
                    setEditingTeam(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="save-button"
                  disabled={teamSaving}
                >
                  {teamSaving
                    ? "Saving…"
                    : editingTeam
                      ? "Update Team"
                      : "Create Team"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================================================= */}
      {/* EDIT DEPARTMENT MODAL */}
      {/* ================================================= */}

      {showEditModal && (
        <div
          className="modal-overlay"
          onClick={() =>
            setShowEditModal(false)
          }
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
                  EDIT DEPARTMENT
                </p>

                <h2>
                  {department.name}
                </h2>

              </div>

              <button
                className="close-button"
                onClick={() =>
                  setShowEditModal(false)
                }
              >
                <X size={18} />
              </button>

            </div>

            <form
              className="department-form"
              onSubmit={handleEditSubmit}
            >

              <div className="form-group">

                <label>
                  Department Name
                </label>

                <input
                  name="name"
                  type="text"
                  defaultValue={
                    department.name
                  }
                  required
                />

              </div>

              <div className="form-group">

                <label>
                  Description
                </label>

                <textarea
                  name="description"
                  rows="3"
                  defaultValue={
                    department.description
                  }
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
                    defaultValue={
                      department.managerTitle
                    }
                  />

                </div>

                <div className="form-group">

                  <label>
                    Annual Budget
                  </label>

                  <input
                    name="budget"
                    type="text"
                    defaultValue={
                      department.budget
                    }
                  />

                </div>

              </div>

              <div className="modal-actions">

                <button
                  type="button"
                  className="cancel-button"
                  onClick={() =>
                    setShowEditModal(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-button"
                  disabled={saving}
                >
                  {saving
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

export default DepartmentDetail;