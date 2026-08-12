import { useState } from "react";
import {
  BarChart3,
  Bell,
  Bot,
  Building2,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  FileText,
  FolderKanban,
  LayoutDashboard,
  MessageSquare,
  MoreVertical,
  Plus,
  Search,
  Sparkles,
  TrendingUp,
  UserRound,
  Users,
  UsersRound,
  Wallet,
  X,
} from "lucide-react";

import "../styles/departments.css";

/* =========================================================
   DEPARTMENT DATA
========================================================= */

const initialDepartments = [
  {
    id: 1,
    code: "ENG",
    name: "Engineering",
    members: 45,
    description:
      "Software development, platform engineering, infrastructure and technical operations.",
    head: "Sarah Jenkins",
    role: "VP of Engineering",
    budget: "$2,850,000",
    type: "brown",
  },
  {
    id: 2,
    code: "FIN",
    name: "Finance & Ops",
    members: 28,
    description:
      "Financial planning, operations management, procurement and business administration.",
    head: "Rachel Green",
    role: "VP of Finance",
    budget: "$1,180,000",
    type: "tan",
  },
  {
    id: 3,
    code: "HR",
    name: "Human Resources",
    members: 16,
    description:
      "People operations, employee experience, workplace culture and talent management.",
    head: "Emma Watson",
    role: "Chief People Officer",
    budget: "$950,000",
    type: "green",
  },
  {
    id: 4,
    code: "PD",
    name: "Product & Design",
    members: 22,
    description:
      "Product strategy, user experience, product design and research initiatives.",
    head: "Daniel Brown",
    role: "VP of Product",
    budget: "$1,420,000",
    type: "brown",
  },
  {
    id: 5,
    code: "MKT",
    name: "Marketing",
    members: 18,
    description:
      "Brand strategy, campaigns, communications, content and customer engagement.",
    head: "Olivia Smith",
    role: "Marketing Director",
    budget: "$1,750,000",
    type: "tan",
  },
  {
    id: 6,
    code: "SAL",
    name: "Sales",
    members: 31,
    description:
      "Customer relationships, business development, sales operations and partnerships.",
    head: "James Wilson",
    role: "VP of Sales",
    budget: "$2,100,000",
    type: "green",
  },
];

/* =========================================================
   SIDEBAR MENU
========================================================= */

const menuItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Departments",
    icon: Building2,
    active: true,
  },
  {
    label: "Employees",
    icon: UserRound,
  },
  {
    label: "Teams",
    icon: UsersRound,
  },
  {
    label: "Projects",
    icon: FolderKanban,
  },
  {
    label: "Productivity",
    icon: BarChart3,
  },
  {
    label: "AI Manager",
    icon: Bot,
    badge: "Pro",
  },
  {
    label: "Collaboration",
    icon: MessageSquare,
  },
  {
    label: "Calendar",
    icon: CalendarDays,
  },
  {
    label: "Documents",
    icon: FileText,
  },
];

/* =========================================================
   MAIN COMPONENT
========================================================= */

function Departments() {
  const [departments, setDepartments] = useState(initialDepartments);

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [sortBy, setSortBy] = useState("name");

  /* -------------------------------------------------------
     SEARCH
  ------------------------------------------------------- */

  const filteredDepartments = departments
    .filter((department) => {
      const searchText = search.toLowerCase();

      return (
        department.name.toLowerCase().includes(searchText) ||
        department.head.toLowerCase().includes(searchText) ||
        department.role.toLowerCase().includes(searchText)
      );
    })
    .sort((a, b) => {
      if (sortBy === "members") {
        return b.members - a.members;
      }

      if (sortBy === "budget") {
        return (
          Number(b.budget.replace(/[$,]/g, "")) -
          Number(a.budget.replace(/[$,]/g, ""))
        );
      }

      return a.name.localeCompare(b.name);
    });

  /* -------------------------------------------------------
     CREATE DEPARTMENT
  ------------------------------------------------------- */

  const handleCreateDepartment = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const newDepartment = {
      id: Date.now(),
      code: formData.get("code").toUpperCase(),
      name: formData.get("name"),
      members: Number(formData.get("members")) || 0,
      description:
        formData.get("description") ||
        "Department description has not been added yet.",
      head: formData.get("head") || "Not Assigned",
      role: formData.get("role") || "Department Head",
      budget: formData.get("budget") || "$0",
      type: "brown",
    };

    setDepartments((currentDepartments) => [
      ...currentDepartments,
      newDepartment,
    ]);

    setShowModal(false);
  };

  return (
    <div className="departments-page">

      {/* ===================================================
          SIDEBAR
      =================================================== */}

      <aside className="sidebar">

        {/* BRAND */}

        <div className="sidebar-brand">

          <div className="brand-logo">
            A
          </div>

          <div className="brand-text">
            <h2>Aetheria</h2>
            <span>COMPANY MANAGEMENT</span>
          </div>

        </div>

        {/* NAVIGATION */}

        <div className="sidebar-label">
          WORKSPACE
        </div>

        <nav className="sidebar-menu">

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                className={`sidebar-item ${
                  item.active ? "active" : ""
                }`}
              >

                <Icon size={17} />

                <span>{item.label}</span>

                {item.badge && (
                  <small>{item.badge}</small>
                )}

              </button>
            );
          })}

        </nav>

        {/* USER */}

        <div className="sidebar-user">

          <div className="user-card">

            <div className="user-avatar">
              SJ
            </div>

            <div className="user-details">
              <strong>Sarah Jenkins</strong>
              <span>Admin · Online</span>
            </div>

            <ChevronDown size={15} />

          </div>

        </div>

      </aside>

      {/* ===================================================
          MAIN CONTENT
      =================================================== */}

      <main className="main-content">

        {/* TOPBAR */}

        <header className="topbar">

          <div className="breadcrumb">

            <span>Organization</span>

            <ChevronRight size={14} />

            <strong>Departments</strong>

          </div>

          <div className="topbar-right">

            {/* SEARCH */}

            <div className="top-search">

              <Search size={16} />

              <input
                type="text"
                placeholder="Search departments, members, teams..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
              />

              <span>⌘ K</span>

            </div>

            {/* AI BUTTON */}

            <button className="ai-button">

              <Sparkles size={15} />

              <span>AI Org Assistant</span>

            </button>

            {/* NOTIFICATION */}

            <button className="notification-button">

              <Bell size={18} />

              <i></i>

            </button>

          </div>

        </header>

        {/* PAGE */}

        <div className="page-content">

          {/* PAGE HEADER */}

          <section className="page-header">

            <div>

              <p className="page-label">
                ORGANIZATION STRUCTURE
              </p>

              <h1>Departments</h1>

              <p className="page-subtitle">
                Manage your organization's departments,
                teams, members, budgets, and operational
                structure.
              </p>

            </div>

            <button
              className="create-button"
              onClick={() => setShowModal(true)}
            >

              <Plus size={17} />

              Create Department

            </button>

          </section>

          {/* =================================================
              STATISTICS
          ================================================= */}

          <section className="stats-grid">

            <StatCard
              title="TOTAL DEPARTMENTS"
              value="5"
              description="Fully active departments"
              trend="+1 this quarter"
              icon={<Building2 size={18} />}
            />

            <StatCard
              title="TOTAL EMPLOYEES"
              value="18"
              description="Across all departments"
              trend="+8.2% this year"
              icon={<Users size={18} />}
            />

            <StatCard
              title="ACTIVE TEAMS"
              value="15"
              description="Currently operating"
              trend="+3 this month"
              icon={<UsersRound size={18} />}
            />

            <StatCard
              title="ALLOCATED BUDGET"
              value="$8.15M"
              description="Annual department budget"
              trend="+10.5% this year"
              icon={<Wallet size={18} />}
            />

          </section>

          {/* =================================================
              DEPARTMENT SECTION
          ================================================= */}

          <section className="department-section">

            {/* SECTION HEADER */}

            <div className="section-header">

              <div className="section-title">

                <div className="section-title-main">

                  <Building2 size={18} />

                  <h2>Company Departments</h2>

                  <span>
                    {filteredDepartments.length} Active
                  </span>

                </div>

                <p>
                  View and manage all organizational
                  departments.
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

                  <option value="members">
                    Sort by Members
                  </option>

                  <option value="budget">
                    Sort by Budget
                  </option>
                </select>

                <button
                  className="small-create-button"
                  onClick={() => setShowModal(true)}
                >

                  <Plus size={15} />

                  Create

                </button>

              </div>

            </div>

            {/* DEPARTMENT CARDS */}

            {filteredDepartments.length > 0 ? (

              <div className="departments-grid">

                {filteredDepartments.map((department) => (

                  <DepartmentCard
                    key={department.id}
                    department={department}
                  />

                ))}

              </div>

            ) : (

              <div className="empty-state">

                <Search size={30} />

                <h3>No departments found</h3>

                <p>
                  Try searching for another department
                  or employee.
                </p>

              </div>

            )}

          </section>

        </div>

      </main>

      {/* ===================================================
          CREATE DEPARTMENT MODAL
      =================================================== */}

      {showModal && (

        <div
          className="modal-overlay"
          onClick={() => setShowModal(false)}
        >

          <div
            className="department-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* MODAL HEADER */}

            <div className="modal-header">

              <div>

                <p className="page-label">
                  NEW DEPARTMENT
                </p>

                <h2>Create Department</h2>

              </div>

              <button
                className="close-button"
                onClick={() => setShowModal(false)}
              >

                <X size={18} />

              </button>

            </div>

            {/* FORM */}

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
                    Short Name
                  </label>

                  <input
                    name="code"
                    type="text"
                    placeholder="ENG"
                    maxLength="5"
                    required
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
                    Department Head
                  </label>

                  <input
                    name="head"
                    type="text"
                    placeholder="Sarah Jenkins"
                  />

                </div>

                <div className="form-group">

                  <label>
                    Role
                  </label>

                  <input
                    name="role"
                    type="text"
                    placeholder="VP of Engineering"
                  />

                </div>

              </div>

              <div className="form-row">

                <div className="form-group">

                  <label>
                    Members
                  </label>

                  <input
                    name="members"
                    type="number"
                    min="0"
                    placeholder="25"
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

              {/* FORM BUTTONS */}

              <div className="modal-actions">

                <button
                  type="button"
                  className="cancel-button"
                  onClick={() =>
                    setShowModal(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-button"
                >

                  <Plus size={16} />

                  Create Department

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
   STAT CARD COMPONENT
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
   DEPARTMENT CARD COMPONENT
========================================================= */

function DepartmentCard({ department }) {
  const initials = department.head
    .split(" ")
    .map((name) => name[0])
    .join("")
    .slice(0, 2);

  return (
    <article
      className={`department-card ${department.type}`}
    >

      {/* TOP ACCENT */}

      <div className="card-accent"></div>

      <div className="department-card-body">

        {/* CARD HEADER */}

        <div className="department-card-header">

          <div className="department-code">
            {department.code}
          </div>

          <div className="department-title">

            <h3>
              {department.name}
            </h3>

            <span>
              <Users size={12} />
              {department.members} Members
            </span>

          </div>

          <button className="more-button">
            <MoreVertical size={17} />
          </button>

        </div>

        {/* DESCRIPTION */}

        <p className="department-description">
          {department.description}
        </p>

        {/* DEPARTMENT HEAD */}

        <div className="department-head">

          <div className="head-avatar">
            {initials}
          </div>

          <div className="head-info">

            <span>
              Department Head
            </span>

            <strong>
              {department.head}
            </strong>

            <small>
              {department.role}
            </small>

          </div>

        </div>

        {/* FOOTER */}

        <div className="department-card-footer">

          <div className="budget">

            <span>
              ANNUAL BUDGET
            </span>

            <strong>
              {department.budget}
            </strong>

          </div>

          <button className="details-button">

            View Details

            <ChevronRight size={14} />

          </button>

        </div>

      </div>

    </article>
  );
}

export default Departments;