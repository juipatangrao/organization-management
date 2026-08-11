import { useState } from "react";
import {
  Plus,
  Search,
  Users,
} from "lucide-react";

import OrganizationHeader from "../components/OrganizationHeader";
import OrganizationSidebar from "../components/OrganizationSidebar";
import TeamCard from "../components/TeamCard";

function Teams() {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  // Temporary frontend data.
  // Later this will come from your backend API.
  const teams = [
    {
      name: "Engineering",
      description:
        "Product development and engineering team.",
      manager: "Rahul Patil",
      members: 14,
    },
    {
      name: "Design",
      description:
        "UI/UX and product design team.",
      manager: "Sneha Sharma",
      members: 8,
    },
    {
      name: "Marketing",
      description:
        "Marketing and brand growth team.",
      manager: "Amit Kulkarni",
      members: 10,
    },
    {
      name: "Testing",
      description:
        "Quality assurance and testing team.",
      manager: "Priya Shah",
      members: 7,
    },
    {
      name: "Human Resources",
      description:
        "People operations and HR management.",
      manager: "Jui Deshmukh",
      members: 5,
    },
    {
      name: "Finance",
      description:
        "Finance and accounting team.",
      manager: "Neha Patil",
      members: 6,
    },
  ];

  return (
    <div className="app-layout">

      {/* HEADER */}

      <OrganizationHeader
        onMenuClick={() =>
          setSidebarOpen(!sidebarOpen)
        }
      />

      <div className="main-layout">

        {/* SIDEBAR */}

        <div
          className={`sidebar-wrapper ${
            sidebarOpen
              ? "sidebar-mobile-open"
              : ""
          }`}
        >
          <OrganizationSidebar role="hr" />
        </div>

        {/* MAIN */}

        <main className="main-content">

          {/* PAGE HEADER */}

          <div className="page-heading">

            <div>

              <span className="page-label">
                ORGANIZATION
              </span>

              <h1>Teams</h1>

              <p>
                View and manage teams in
                your organization.
              </p>

            </div>

            <button className="primary-button">

              <Plus size={17} />

              Create Team

            </button>

          </div>

          {/* SUMMARY */}

          <div className="team-summary">

            <div className="team-summary-left">

              <div className="team-summary-icon">
                <Users size={21} />
              </div>

              <div>
                <strong>
                  8 Teams
                </strong>

                <span>
                  Active organization teams
                </span>
              </div>

            </div>

            <div className="team-search">

              <Search size={17} />

              <input
                type="text"
                placeholder="Search teams..."
              />

            </div>

          </div>

          {/* TEAM LIST */}

          <div className="teams-grid">

            {teams.map((team, index) => (
              <TeamCard
                key={index}
                team={team}
                isHR={true}
              />
            ))}

          </div>

        </main>

      </div>

    </div>
  );
}

export default Teams;