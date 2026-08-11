import {
  Home,
  BriefcaseBusiness,
  CheckSquare,
  FolderKanban,
  Users,
  UsersRound,
  Settings,
  ShieldCheck,
  UserCog,
  Building2,
  UserPlus,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

function OrganizationSidebar({ role = "employee" }) {
  const location = useLocation();

  const isHR = role === "hr";

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <aside className="organization-sidebar">

      {/* =====================================
          ORGANIZATION HEADER
      ====================================== */}

      <div className="sidebar-organization">

        <div className="sidebar-org-logo">
          <Building2 size={20} />
        </div>

        <div className="sidebar-org-info">
          <strong>ABC Technologies</strong>
          <span>Organization</span>
        </div>

      </div>


      {/* =====================================
          HOME
      ====================================== */}

      <div className="sidebar-section">

        <span className="sidebar-title">
          HOME
        </span>

        <Link
          to="/organization"
          className={`sidebar-item ${
            isActive("/organization")
              ? "sidebar-item-active"
              : ""
          }`}
        >
          <Home size={17} />
          <span>Overview</span>
        </Link>

      </div>


      {/* =====================================
          PERSONAL
      ====================================== */}

      <div className="sidebar-section">

        <span className="sidebar-title">
          PERSONAL
        </span>

        <Link
          to="/personal"
          className={`sidebar-item ${
            isActive("/personal")
              ? "sidebar-item-active"
              : ""
          }`}
        >
          <BriefcaseBusiness size={17} />
          <span>My Work</span>
        </Link>

        <Link
          to="/personal"
          className="sidebar-item"
        >
          <CheckSquare size={17} />
          <span>My Tasks</span>
        </Link>

        <Link
          to="/personal"
          className="sidebar-item"
        >
          <FolderKanban size={17} />
          <span>My Projects</span>
        </Link>

      </div>


      {/* =====================================
          ORGANIZATION
      ====================================== */}

      <div className="sidebar-section">

        <span className="sidebar-title">
          ORGANIZATION
        </span>

        <Link
          to="/organization"
          className={`sidebar-item ${
            isActive("/organization")
              ? "sidebar-item-active"
              : ""
          }`}
        >
          <Building2 size={17} />
          <span>ABC Technologies</span>
        </Link>

        <Link
          to="/organization"
          className="sidebar-item"
        >
          <FolderKanban size={17} />
          <span>Shared Work</span>
        </Link>

      </div>


      {/* =====================================
          TEAMS
      ====================================== */}

      <div className="sidebar-section">

        <span className="sidebar-title">
          TEAMS
        </span>

        {/* All Teams */}

        <Link
          to="/organization/teams"
          className={`sidebar-item ${
            isActive("/organization/teams")
              ? "sidebar-item-active"
              : ""
          }`}
        >
          <UsersRound size={17} />
          <span>Teams</span>
        </Link>

        {/* Engineering */}

        <Link
          to="/organization/teams"
          className="sidebar-item sidebar-sub-item"
        >
          <Users size={16} />
          <span>Engineering</span>
        </Link>

        {/* Design */}

        <Link
          to="/organization/teams"
          className="sidebar-item sidebar-sub-item"
        >
          <Users size={16} />
          <span>Design</span>
        </Link>

        {/* Marketing */}

        <Link
          to="/organization/teams"
          className="sidebar-item sidebar-sub-item"
        >
          <Users size={16} />
          <span>Marketing</span>
        </Link>

      </div>


      {/* =====================================
          MEMBERS
      ====================================== */}

      <div className="sidebar-section">

        <span className="sidebar-title">
          PEOPLE
        </span>

        {/* Members */}

        <Link
          to="/organization/members"
          className={`sidebar-item ${
            isActive("/organization/members")
              ? "sidebar-item-active"
              : ""
          }`}
        >
          <Users size={17} />
          <span>Members</span>
        </Link>

        {/* Groups */}

        <Link
          to="/organization/groups"
          className={`sidebar-item ${
            isActive("/organization/groups")
              ? "sidebar-item-active"
              : ""
          }`}
        >
          <UsersRound size={17} />
          <span>Groups</span>
        </Link>

      </div>


      {/* =====================================
          HR / ADMIN
      ====================================== */}

      {isHR && (
        <div className="sidebar-section">

          <span className="sidebar-title">
            ADMIN
          </span>

          {/* Manage Members */}

          <Link
            to="/organization/members"
            className={`sidebar-item ${
              isActive("/organization/members")
                ? "sidebar-item-active"
                : ""
            }`}
          >
            <UserCog size={17} />
            <span>Manage Members</span>
          </Link>


          {/* Invite Member */}

          <Link
            to="/organization/members"
            className="sidebar-item"
          >
            <UserPlus size={17} />
            <span>Invite Member</span>
          </Link>


          {/* Manage Teams */}

          <Link
            to="/organization/teams"
            className={`sidebar-item ${
              isActive("/organization/teams")
                ? "sidebar-item-active"
                : ""
            }`}
          >
            <UsersRound size={17} />
            <span>Manage Teams</span>
          </Link>


          {/* Roles & Permissions */}

          <Link
            to="/organization/roles"
            className={`sidebar-item ${
              isActive("/organization/roles")
                ? "sidebar-item-active"
                : ""
            }`}
          >
            <ShieldCheck size={17} />
            <span>Roles & Permissions</span>
          </Link>


          {/* Organization Settings */}

          <Link
            to="/organization/settings"
            className={`sidebar-item ${
              isActive("/organization/settings")
                ? "sidebar-item-active"
                : ""
            }`}
          >
            <Settings size={17} />
            <span>Organization Settings</span>
          </Link>

        </div>
      )}

    </aside>
  );
}

export default OrganizationSidebar;