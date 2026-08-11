import { useState } from "react";
import {
  Users,
  UsersRound,
  FolderKanban,
  User,
} from "lucide-react";

import OrganizationHeader from "../components/OrganizationHeader";
import OrganizationSidebar from "../components/OrganizationSidebar";

function EmployeeDashboard() {
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
          {/* Employee gets employee sidebar */}
          <OrganizationSidebar role="employee" />
        </div>

        <main className="main-content">

          <div className="page-heading">

            <div>

              <span className="page-label">
                MY ORGANIZATION
              </span>

              <h1>My Organization</h1>

              <p>
                View your organization and
                team information.
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
                Your organization workspace.
              </p>

              <div className="organization-meta">

                <span>
                  📍 Pune, Maharashtra
                </span>

                <span>
                  👤 127 Members
                </span>

              </div>

            </div>

          </div>

          {/* My Team */}

          <div className="content-section">

            <div className="section-header">

              <div>

                <h2>My Team</h2>

                <p>
                  Your current team and teammates.
                </p>

              </div>

            </div>

            <div className="employee-team-card">

              <div className="employee-team-icon">
                <UsersRound size={24} />
              </div>

              <div>

                <h3>Engineering</h3>

                <p>
                  Product Engineering Team
                </p>

                <span>
                  14 team members
                </span>

              </div>

            </div>

          </div>

          {/* Employee sections */}

          <div className="employee-card-grid">

            <div className="employee-info-card">

              <div className="employee-card-icon">
                <Users size={20} />
              </div>

              <h3>Team Members</h3>

              <p>
                View the members of your team.
              </p>

              <button>
                View Members
              </button>

            </div>

            <div className="employee-info-card">

              <div className="employee-card-icon">
                <FolderKanban size={20} />
              </div>

              <h3>Shared Work</h3>

              <p>
                Access work shared with your
                organization.
              </p>

              <button>
                View Shared Work
              </button>

            </div>

            <div className="employee-info-card">

              <div className="employee-card-icon">
                <User size={20} />
              </div>

              <h3>Personal Space</h3>

              <p>
                Go back to your personal
                workspace.
              </p>

              <button>
                Open Personal Space
              </button>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}

export default EmployeeDashboard;