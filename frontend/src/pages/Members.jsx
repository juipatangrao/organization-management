import { useState } from "react";
import {
  Search,
  Plus,
  Users,
  MoreVertical,
  Mail,
  ShieldCheck,
  UserCog,
} from "lucide-react";

import OrganizationHeader from "../components/OrganizationHeader";
import OrganizationSidebar from "../components/OrganizationSidebar";
import InviteMemberModal from "../components/InviteMemberModal";

function Members() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [inviteModalOpen, setInviteModalOpen] =
    useState(false);

  const [search, setSearch] = useState("");

  const [members, setMembers] = useState([
    {
      id: 1,
      name: "Jui Deshmukh",
      email: "jui@abctechnologies.com",
      role: "hr",
      department: "HR",
      team: "Management",
      status: "Active",
    },
    {
      id: 2,
      name: "Rahul Patil",
      email: "rahul@abctechnologies.com",
      role: "team_manager",
      department: "Engineering",
      team: "Engineering",
      status: "Active",
    },
    {
      id: 3,
      name: "Sneha Sharma",
      email: "sneha@abctechnologies.com",
      role: "employee",
      department: "Design",
      team: "Design",
      status: "Active",
    },
    {
      id: 4,
      name: "Amit Kulkarni",
      email: "amit@abctechnologies.com",
      role: "employee",
      department: "Engineering",
      team: "Engineering",
      status: "Active",
    },
    {
      id: 5,
      name: "Priya Shah",
      email: "priya@abctechnologies.com",
      role: "employee",
      department: "Product",
      team: "Product",
      status: "Active",
    },
    {
      id: 6,
      name: "Neha Patil",
      email: "neha@abctechnologies.com",
      role: "employee",
      department: "Marketing",
      team: "Marketing",
      status: "Active",
    },
  ]);

  /* =========================================
     SEARCH
  ========================================= */

  const filteredMembers = members.filter((member) => {
    const searchText = search.toLowerCase();

    return (
      member.name.toLowerCase().includes(searchText) ||
      member.email.toLowerCase().includes(searchText) ||
      member.department
        .toLowerCase()
        .includes(searchText) ||
      member.team
        .toLowerCase()
        .includes(searchText) ||
      member.role
        .toLowerCase()
        .includes(searchText)
    );
  });


  /* =========================================
     INVITE MEMBER
  ========================================= */

  const handleInviteMember = (newMember) => {
    const member = {
      id: Date.now(),

      name: newMember.name,

      email: newMember.email,

      role: newMember.role,

      department: newMember.department,

      team: "Not assigned",

      status: "Invited",
    };

    setMembers((previous) => [
      ...previous,
      member,
    ]);
  };


  /* =========================================
     ROLE DISPLAY
  ========================================= */

  const getRoleName = (role) => {
    switch (role) {
      case "hr":
        return "HR";

      case "team_manager":
        return "Team Manager";

      default:
        return "Employee";
    }
  };


  /* =========================================
     ROLE ICON
  ========================================= */

  const getRoleIcon = (role) => {
    if (role === "hr") {
      return <ShieldCheck size={14} />;
    }

    if (role === "team_manager") {
      return <UserCog size={14} />;
    }

    return <Users size={14} />;
  };


  return (
    <div className="app-layout">

      {/* =====================================
          HEADER
      ====================================== */}

      <OrganizationHeader
        onMenuClick={() =>
          setSidebarOpen(!sidebarOpen)
        }
      />


      <div className="main-layout">

        {/* ===================================
            SIDEBAR
        ==================================== */}

        <div
          className={`sidebar-wrapper ${
            sidebarOpen
              ? "sidebar-mobile-open"
              : ""
          }`}
        >
          <OrganizationSidebar role="hr" />
        </div>


        {/* ===================================
            MAIN CONTENT
        ==================================== */}

        <main className="main-content">

          {/* =================================
              PAGE HEADER
          ================================== */}

          <div className="page-heading">

            <div>

              <span className="page-label">
                ORGANIZATION
              </span>

              <h1>Members</h1>

              <p>
                Manage employees and organization
                members.
              </p>

            </div>


            <button
              type="button"
              className="primary-button"
              onClick={() =>
                setInviteModalOpen(true)
              }
            >
              <Plus size={17} />

              Add Employee
            </button>

          </div>


          {/* =================================
              SUMMARY CARDS
          ================================== */}

          <div className="members-summary">

            {/* Total */}

            <div className="member-summary-card">

              <div className="member-summary-icon">
                <Users size={19} />
              </div>

              <div>
                <span>Total Members</span>

                <strong>
                  {members.length}
                </strong>
              </div>

            </div>


            {/* Active */}

            <div className="member-summary-card">

              <div className="member-summary-icon active">
                <ShieldCheck size={19} />
              </div>

              <div>
                <span>Active Members</span>

                <strong>
                  {
                    members.filter(
                      (member) =>
                        member.status ===
                        "Active"
                    ).length
                  }
                </strong>
              </div>

            </div>


            {/* Teams */}

            <div className="member-summary-card">

              <div className="member-summary-icon team">
                <Users size={19} />
              </div>

              <div>
                <span>Teams</span>

                <strong>4</strong>
              </div>

            </div>


            {/* Departments */}

            <div className="member-summary-card">

              <div className="member-summary-icon department">
                <UserCog size={19} />
              </div>

              <div>
                <span>Departments</span>

                <strong>5</strong>
              </div>

            </div>

          </div>


          {/* =================================
              MEMBERS TABLE CARD
          ================================== */}

          <div className="members-card">

            {/* Table Header */}

            <div className="members-card-header">

              <div>

                <h2>
                  Organization Members
                </h2>

                <p>
                  {filteredMembers.length} members
                  displayed
                </p>

              </div>


              {/* Search */}

              <div className="members-search">

                <Search size={16} />

                <input
                  type="text"
                  placeholder="Search members..."
                  value={search}
                  onChange={(event) =>
                    setSearch(
                      event.target.value
                    )
                  }
                />

              </div>

            </div>


            {/* =================================
                TABLE
            ================================== */}

            <div className="members-table-wrapper">

              <table className="members-table">

                <thead>

                  <tr>

                    <th>MEMBER</th>

                    <th>ROLE</th>

                    <th>DEPARTMENT</th>

                    <th>TEAM</th>

                    <th>STATUS</th>

                    <th></th>

                  </tr>

                </thead>


                <tbody>

                  {filteredMembers.length > 0 ? (

                    filteredMembers.map(
                      (member) => (

                        <tr key={member.id}>

                          {/* MEMBER */}

                          <td>

                            <div className="member-info">

                              <div className="member-avatar">
                                {member.name
                                  .charAt(0)
                                  .toUpperCase()}
                              </div>

                              <div>

                                <strong>
                                  {member.name}
                                </strong>

                                <span>
                                  <Mail
                                    size={12}
                                  />

                                  {member.email}
                                </span>

                              </div>

                            </div>

                          </td>


                          {/* ROLE */}

                          <td>

                            <div
                              className={`member-role ${member.role}`}
                            >

                              {getRoleIcon(
                                member.role
                              )}

                              {getRoleName(
                                member.role
                              )}

                            </div>

                          </td>


                          {/* DEPARTMENT */}

                          <td>

                            <span className="department-name">
                              {member.department}
                            </span>

                          </td>


                          {/* TEAM */}

                          <td>

                            <span className="team-name">
                              {member.team}
                            </span>

                          </td>


                          {/* STATUS */}

                          <td>

                            <span
                              className={`member-status ${
                                member.status ===
                                "Active"
                                  ? "status-active"
                                  : "status-invited"
                              }`}
                            >
                              <span className="status-dot"></span>

                              {member.status}

                            </span>

                          </td>


                          {/* MENU */}

                          <td>

                            <button
                              type="button"
                              className="member-menu-button"
                            >
                              <MoreVertical
                                size={17}
                              />
                            </button>

                          </td>

                        </tr>

                      )
                    )

                  ) : (

                    <tr>

                      <td
                        colSpan="6"
                        className="members-empty"
                      >

                        <Users size={30} />

                        <strong>
                          No members found
                        </strong>

                        <span>
                          Try another search.
                        </span>

                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

          </div>

        </main>

      </div>


      {/* =====================================
          INVITE MEMBER MODAL
      ====================================== */}

      <InviteMemberModal
        isOpen={inviteModalOpen}
        onClose={() =>
          setInviteModalOpen(false)
        }
        onInvite={handleInviteMember}
      />

    </div>
  );
}

export default Members;