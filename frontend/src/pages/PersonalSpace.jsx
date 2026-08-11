import { useState } from "react";

import OrganizationSidebar from "../components/OrganizationSidebar";
import OrganizationHeader from "../components/OrganizationHeader";

function PersonalSpace() {
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
                PERSONAL SPACE
              </span>

              <h1>Personal Space</h1>

              <p>
                Manage your personal workspace
                and stay organized.
              </p>
            </div>

          </div>

          <div className="welcome-card">

            <div>
              <span className="welcome-small">
                Welcome back
              </span>

              <h2>
                Hello, Arya 👋
              </h2>

              <p>
                Everything related to your
                personal work is available here.
              </p>
            </div>

          </div>

          <div className="workspace-cards">

            <div className="workspace-card">

              <div className="card-icon blue">
                ✓
              </div>

              <h3>My Work</h3>

              <p>
                Your personal work and
                activities.
              </p>

              <button>Open My Work</button>

            </div>

            <div className="workspace-card">

              <div className="card-icon purple">
                ✓
              </div>

              <h3>My Tasks</h3>

              <p>
                View tasks assigned to you.
              </p>

              <button>View Tasks</button>

            </div>

            <div className="workspace-card">

              <div className="card-icon green">
                📁
              </div>

              <h3>My Projects</h3>

              <p>
                Access your personal projects.
              </p>

              <button>View Projects</button>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}

export default PersonalSpace;