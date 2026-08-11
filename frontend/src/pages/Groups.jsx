import { useState } from "react";
import {
  Plus,
  Search,
  Users,
} from "lucide-react";

import OrganizationHeader from "../components/OrganizationHeader";
import OrganizationSidebar from "../components/OrganizationSidebar";
import GroupCard from "../components/GroupCard";

function Groups() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");

  const groups = [
    {
      id: 1,
      name: "Engineering Group",
      description:
        "Employees working across engineering teams.",
      owner: "Rahul Patil",
      members: 24,
    },
    {
      id: 2,
      name: "Design Group",
      description:
        "Designers and creative team members.",
      owner: "Sneha Sharma",
      members: 12,
    },
    {
      id: 3,
      name: "HR Group",
      description:
        "Human resources and people operations.",
      owner: "Jui Deshmukh",
      members: 8,
    },
    {
      id: 4,
      name: "Management Group",
      description:
        "Organization managers and leadership.",
      owner: "Amit Kulkarni",
      members: 10,
    },
    {
      id: 5,
      name: "Product Group",
      description:
        "Product managers and product specialists.",
      owner: "Priya Shah",
      members: 15,
    },
    {
      id: 6,
      name: "New Employees",
      description:
        "Recently joined organization members.",
      owner: "Neha Patil",
      members: 7,
    },
  ];

  const filteredGroups = groups.filter((group) =>
    group.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

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

        {/* MAIN CONTENT */}

        <main className="main-content">

          {/* PAGE HEADING */}

          <div className="page-heading">

            <div>

              <span className="page-label">
                ORGANIZATION
              </span>

              <h1>Groups</h1>

              <p>
                Organize and manage members
                using groups.
              </p>

            </div>

            <button
              className="primary-button"
              type="button"
            >
              <Plus size={17} />
              Create Group
            </button>

          </div>

          {/* SUMMARY */}

          <div className="group-summary">

            <div className="group-summary-left">

              <div className="group-summary-icon">
                <Users size={21} />
              </div>

              <div>

                <strong>
                  {groups.length} Groups
                </strong>

                <span>
                  Organization member groups
                </span>

              </div>

            </div>

            {/* SEARCH */}

            <div className="group-search">

              <Search size={17} />

              <input
                type="text"
                placeholder="Search groups..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
              />

            </div>

          </div>

          {/* GROUP LIST */}

          {filteredGroups.length > 0 ? (

            <div className="groups-grid">

              {filteredGroups.map((group) => (
                <GroupCard
                  key={group.id}
                  group={group}
                  isHR={true}
                />
              ))}

            </div>

          ) : (

            <div className="empty-state">

              <Users size={35} />

              <h3>No groups found</h3>

              <p>
                Try searching with another
                group name.
              </p>

            </div>

          )}

        </main>

      </div>

    </div>
  );
}

export default Groups;