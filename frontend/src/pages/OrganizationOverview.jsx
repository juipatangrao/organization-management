import { useState } from "react";

import OrganizationSidebar from "../components/OrganizationSidebar";
import OrganizationHeader from "../components/OrganizationHeader";

function OrganizationOverview() {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  return (
    <div className="app-layout">

      <OrganizationHeader
        onMenuClick={() =>
          setSidebarOpen(!sidebarOpen)
        }
      />

      <div className="main-layout">

        <div
          className={`sidebar-wrapper ${
            sidebarOpen
              ? "sidebar-mobile-open"
              : ""
          }`}
        >
          <OrganizationSidebar role="hr" />
        </div>

        <main className="main-content">

          <div className="page-heading">

            <div>

              <span className="page-label">
                ORGANIZATION
              </span>

              <h1>
                Organization Overview
              </h1>

              <p>
                Manage and view your
                organization workspace.
              </p>

            </div>

            <button className="primary-button">
              + Create Team
            </button>

          </div>

          <div className="organization-profile">

            <div className="organization-logo">
              ABC
            </div>

            <div className="organization-details">

              <h2>ABC Technologies</h2>

              <p>
                Building innovative digital
                products and solutions.
              </p>

              <div className="organization-meta">

                <span>
                  🌐 www.abctech.com
                </span>

                <span>
                  📍 Pune, Maharashtra
                </span>

                <span>
                  👤 Owner: ABC Admin
                </span>

              </div>

            </div>

          </div>

          <div className="stats-grid">

            <div className="stat-card">

              <span>Members</span>

              <strong>127</strong>

              <small>
                Organization members
              </small>

            </div>

            <div className="stat-card">

              <span>Teams</span>

              <strong>8</strong>

              <small>
                Active teams
              </small>

            </div>

            <div className="stat-card">

              <span>Groups</span>

              <strong>12</strong>

              <small>
                Organization groups
              </small>

            </div>

          </div>

          <div className="content-section">

            <div className="section-header">

              <div>
                <h2>Recent Activity</h2>

                <p>
                  Latest organization activity
                </p>
              </div>

              <button className="text-button">
                View all
              </button>

            </div>

            <div className="activity-list">

              <div className="activity-item">
                <div className="activity-avatar">
                  A
                </div>

                <div>
                  <strong>
                    Arya created a new team
                  </strong>

                  <span>
                    Engineering Team · 2 hours ago
                  </span>
                </div>
              </div>

              <div className="activity-item">
                <div className="activity-avatar">
                  R
                </div>

                <div>
                  <strong>
                    Rahul joined the organization
                  </strong>

                  <span>
                    New member · 4 hours ago
                  </span>
                </div>
              </div>

              <div className="activity-item">
                <div className="activity-avatar">
                  S
                </div>

                <div>
                  <strong>
                    Sarah updated a team
                  </strong>

                  <span>
                    Design Team · Yesterday
                  </span>
                </div>
              </div>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}

export default OrganizationOverview;