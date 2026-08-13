import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Sidebar.css";

const navItems = [
  { name: "Dashboard", icon: "📊" },
  { name: "Organization", icon: "🏢", path: "/departments" },
  { name: "Employees", icon: "👥" },
  { name: "Tasks", icon: "📋" },
  { name: "Projects", icon: "📁" },
  { name: "Productivity", icon: "📈" },
  { name: "AI Manager", icon: "🤖", isAi: true },
  { name: "Collaboration", icon: "💬" },
  { name: "Calendar", icon: "📅" },
  { name: "Documents", icon: "📄" },
  { name: "AI Meeting Assistant", icon: "📹", isAi: true },
  { name: "Analytics", icon: "📊" },
  { name: "AI Automation", icon: "⚡", isAi: true },
  { name: "Workflow Builder", icon: "🔀" },
  { name: "Integrations", icon: "🔌" },
  { name: "HR & Payroll", icon: "💼" },
  { name: "Notifications", icon: "🔔" },
  { name: "Security", icon: "🛡️" },
  { name: "Settings", icon: "⚙️" },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (item) => {
    if (item.path) {
      navigate(item.path);
    } else {
      console.log(`${item.name} page not built yet`);
    }
  };

  return (
    <aside className="app-sidebar">
      <div className="logo-container">
        <div className="logo-icon">❖</div>
        <div className="logo-text">
          <h2>Nexus AI</h2>
          <span>ENTERPRISE SAAS PLATFORM</span>
        </div>
      </div>

      <div className="nav-section-title">ENTERPRISE NAVIGATION</div>

      <nav className="nav-menu">
        {navItems.map((item) => (
          <button
            key={item.name}
            className={`nav-item ${location.pathname === item.path ? "active" : ""}`}
            onClick={() => handleClick(item)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.name}</span>
            {item.isAi && <span className="ai-badge">AI</span>}
          </button>
        ))}
      </nav>

      <div className="active-mode-card">
        <div className="mode-title">Active Mode</div>
        <div className="mode-status">
          HR View <span className="status-dot"></span>
        </div>
      </div>
    </aside>
  );
}