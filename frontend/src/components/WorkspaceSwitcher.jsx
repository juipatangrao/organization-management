import { useState } from "react";
import {
  ChevronDown,
  User,
  Building2,
  Plus,
  UserPlus,
} from "lucide-react";

function WorkspaceSwitcher() {
  const [open, setOpen] = useState(false);
  const [workspace, setWorkspace] = useState("personal");

  const selectWorkspace = (type) => {
    setWorkspace(type);
    setOpen(false);

    if (type === "personal") {
      window.location.href = "/personal";
    }

    if (type === "organization") {
      window.location.href = "/organization";
    }
  };

  return (
    <div className="workspace-switcher-container">
      <button
        className="workspace-switcher"
        onClick={() => setOpen(!open)}
      >
        <div className="workspace-icon">
          {workspace === "personal" ? (
            <User size={18} />
          ) : (
            <Building2 size={18} />
          )}
        </div>

        <div className="workspace-name">
          {workspace === "personal"
            ? "Arya's Personal"
            : "ABC Technologies"}
        </div>

        <ChevronDown
          size={18}
          className={open ? "rotate-icon" : ""}
        />
      </button>

      {open && (
        <div className="workspace-dropdown">
          <div className="dropdown-title">
            PERSONAL
          </div>

          <button
            className={`workspace-option ${
              workspace === "personal"
                ? "active-workspace"
                : ""
            }`}
            onClick={() => selectWorkspace("personal")}
          >
            <User size={17} />

            <span>Personal Space</span>
          </button>

          <div className="dropdown-divider" />

          <div className="dropdown-title">
            ORGANIZATIONS
          </div>

          <button
            className={`workspace-option ${
              workspace === "organization"
                ? "active-workspace"
                : ""
            }`}
            onClick={() =>
              selectWorkspace("organization")
            }
          >
            <Building2 size={17} />

            <span>ABC Technologies</span>
          </button>

          <button className="workspace-option">
            <Building2 size={17} />

            <span>XYZ Organization</span>
          </button>

          <div className="dropdown-divider" />

          <button className="workspace-option">
            <Plus size={17} />

            <span>Create Organization</span>
          </button>

          <button className="workspace-option">
            <UserPlus size={17} />

            <span>Join Organization</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default WorkspaceSwitcher;