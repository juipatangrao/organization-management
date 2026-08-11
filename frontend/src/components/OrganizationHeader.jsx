import {
  Bell,
  Search,
  Menu,
} from "lucide-react";

import WorkspaceSwitcher from "./WorkspaceSwitcher";

function OrganizationHeader({ onMenuClick }) {
  return (
    <header className="organization-header">

      <div className="header-left">

        <button
          className="mobile-menu-button"
          onClick={onMenuClick}
        >
          <Menu size={21} />
        </button>

        <WorkspaceSwitcher />

      </div>

      <div className="header-right">

        <div className="search-box">
          <Search size={17} />

          <input
            type="text"
            placeholder="Search..."
          />
        </div>

        <button className="header-icon">
          <Bell size={19} />
        </button>

        <div className="user-profile">

          <div className="user-avatar">
            A
          </div>

          <div className="user-info">
            <strong>Arya</strong>
            <span>HR</span>
          </div>

        </div>

      </div>

    </header>
  );
}

export default OrganizationHeader;