import React, { useState } from 'react';
import "../styles/Header.css";
export default function Header({ employees = [], setActiveTab }) {
    const [globalSearch, setGlobalSearch] = useState('');
  const [showResults, setShowResults] = useState(false);

  const searchResults = employees.filter((emp) => {
    const search = globalSearch.toLowerCase().trim();

    if (!search) return false;

    return (
      (emp.name || '').toLowerCase().includes(search) ||
      (emp.email || '').toLowerCase().includes(search) ||
      (emp.title || '').toLowerCase().includes(search) ||
      (emp.department || '').toLowerCase().includes(search) ||
      (emp.role || '').toLowerCase().includes(search)
    );
  });

  return (
    <header className="top-header">

      <div className="global-search">
          <span className="global-search-icon">🔍</span>


        <input
          type="text"
          placeholder="Search employees, projects or AI insights..."
          value={globalSearch}
          onChange={(e) => {
            setGlobalSearch(e.target.value);
            setShowResults(true);
          }}
          onFocus={() => setShowResults(true)}
        />

        {showResults && globalSearch.trim() && (
          <div className="global-search-results">

            {searchResults.length > 0 ? (
              searchResults.map((employee) => (
                <div
                  className="global-result-item"
                  key={employee._id}
                >
                  <img
                    src={
                      employee.avatar ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        employee.name || 'Employee'
                      )}`
                    }
                    alt={employee.name}
                  />

                  <div>
                    <strong>{employee.name}</strong>
                    <span>
                      {employee.title || 'Employee'} •{' '}
                      {employee.department || ''}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-global-results">
                No employees found
              </div>
            )}

          </div>
        )}
      </div>

      <div className="header-actions">

       <button
  className="btn-ai-manager"
  onClick={() => setActiveTab('AI Manager')}
>
  ✨ AI Manager
</button>

        {/* ROLE (dev toggle — switches view instantly via localStorage) */}

        <select
          className="role-selector"
          value={localStorage.getItem("roleOverride") || "hr"}
          onChange={(e) => {
            localStorage.setItem("roleOverride", e.target.value);
            window.location.reload();
          }}
        >
          <option value="hr">👤 Role: HR</option>
          <option value="employee">👤 Role: Employee</option>
        </select>

        <div
  className="notification-bell"
  onClick={() => setActiveTab('Notifications')}
  title="Notifications"
>
  🔔
  <span className="badge">3</span>
</div>

        <div className="user-profile">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
            alt="David Chen"
          />

          <div className="user-info">
            <span className="user-name">David Chen</span>
            <span className="user-title">
              VP of HR & Talent
            </span>
          </div>

        </div>

      </div>

    </header>
  );
}