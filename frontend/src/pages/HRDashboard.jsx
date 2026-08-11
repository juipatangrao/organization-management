import { useState } from "react";
import {
  Users,
  UsersRound,
  ShieldCheck,
  Settings,
  UserPlus,
  Plus,
  Building2,
} from "lucide-react";

import OrganizationHeader from "../components/OrganizationHeader";
import OrganizationSidebar from "../components/OrganizationSidebar";

function HRDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-layout">

      <OrganizationHeader
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="main-layout">

        <div
          className={`sidebar-wrapper ${
            sidebarOpen ? "sidebar-mobile-open" : ""
          }`}
        >
          <OrganizationSidebar role="hr" />
        </div>

        <main className="main-content">

          {/* Heading */}

          <div className="page-heading">

            <div>
              <span className="page-label">
                ADMINISTRATION
              </span>

              <h1>Organization Management</h1>

              <p>
                Manage your organization's members,
                teams, groups and permissions.
              </p>
            </div>

          </div>

          {/* Organization */}

          <div className="organization-profile">

            <div className="organization-logo">
              ABC
            </div>

            <div className="organization-details">

              <h2>ABC Technologies</h2>

              <p>
                Organization administration
                dashboard.
              </p>

              <div className="organization-meta">

                <span>
                  🌐 www.abctech.com
                </span>

                <span>
                  📍 Pune, Maharashtra
                </span>

              </div>

            </div>

          </div>

          {/* Statistics */}

          <div className="stats-grid">

            <div className="stat-card">
              <Users size={20} />

              <span>Members</span>

              <strong>127</strong>

              <small>
                Organization members
              </small>
            </div>

            <div className="stat-card">
              <UsersRound size={20} />

              <span>Teams</span>

              <strong>8</strong>

              <small>
                Active teams
              </small>
            </div>

            <div className="stat-card">
              <UsersRound size={20} />

              <span>Groups</span>

              <strong>12</strong>

              <small>
                Organization groups
              </small>
            </div>

          </div>

          {/* Management */}

          <div className="content-section">

            <div className="section-header">

              <div>
                <h2>Organization Management</h2>

                <p>
                  Quickly manage your organization.
                </p>
              </div>

            </div>

            <div className="admin-action-grid">

              <button className="admin-action-card">

                <div className="admin-action-icon">
                  <UserPlus size={20} />
                </div>

                <div>
                  <strong>Add Employee</strong>

                  <span>
                    Add a new member to the
                    organization.
                  </span>
                </div>

              </button>

              <button className="admin-action-card">

                <div className="admin-action-icon">
                  <Plus size={20} />
                </div>

                <div>
                  <strong>Create Team</strong>

                  <span>
                    Create and manage teams.
                  </span>
                </div>

              </button>

              <button className="admin-action-card">

                <div className="admin-action-icon">
                  <UsersRound size={20} />
                </div>

                <div>
                  <strong>Create Group</strong>

                  <span>
                    Organize members into groups.
                  </span>
                </div>

              </button>

              <button className="admin-action-card">

                <div className="admin-action-icon">
                  <ShieldCheck size={20} />
                </div>

                <div>
                  <strong>Roles & Permissions</strong>

                  <span>
                    Manage access and permissions.
                  </span>
                </div>

              </button>

              <button className="admin-action-card">

                <div className="admin-action-icon">
                  <Settings size={20} />
                </div>

                <div>
                  <strong>Organization Settings</strong>

                  <span>
                    Manage organization information.
                  </span>
                </div>

              </button>

              <button className="admin-action-card">

                <div className="admin-action-icon">
                  <Building2 size={20} />
                </div>

                <div>
                  <strong>Manage Organization</strong>

                  <span>
                    View and update organization
                    details.
                  </span>
                </div>

              </button>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}

export default HRDashboard;