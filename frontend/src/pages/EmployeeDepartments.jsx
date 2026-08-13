import { useEffect, useState } from "react";
import { Building2, DollarSign, Users } from "lucide-react";

import "../styles/departments.css";

import Header from "../components/Header";
import { getMyDepartments } from "../api/departments";

const formatCurrency = (num) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(num || 0);

function EmployeeDepartments() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [profile] = useState({
    name: "yogita autade",
    designation: "engineer",
    email: "co2024.yogita.autade@ves.ac.in",
    image: null,
  });

  useEffect(() => {
    getMyDepartments()
      .then(setDepartments)
      .catch((err) => {
        console.error("Failed to load your departments:", err);
        setError(err.response?.data?.message || "Failed to load your department.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="departments-page">
      <main className="main-content">
        <Header employees={[]} profile={profile} />

        <div className="page-content">
          <section className="page-header">
            <div>
              <p className="page-label">MY WORKSPACE</p>
              <h1>My Department</h1>
              <p className="page-subtitle">
                View your department details, team, and structure.
              </p>
            </div>
          </section>

          {loading && <p>Loading…</p>}

          {!loading && error && (
            <div className="empty-state">
              <h3>Couldn't load your department</h3>
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && departments.length === 0 && (
            <div className="empty-state">
              <Users size={30} />
              <h3>You're not assigned to a department yet</h3>
              <p>Contact HR to get added to a department.</p>
            </div>
          )}

          {!loading &&
            !error &&
            departments.map((department) => (
              <section className="dept-header-card" key={department._id}>
                <div className="dept-header-top">
                  <div className="dept-header-main">
                    <span className="dept-code-badge">{department.code || "—"}</span>
                    <h1>{department.name} Department</h1>
                  </div>
                </div>

                <p className="dept-header-description">
                  {department.description || "No description added yet."}
                </p>

                <div className="dept-header-meta">
                  <div className="meta-stat">
                    <Users size={15} />
                    Your role: {department.myRole}
                  </div>

                  <div className="meta-stat">
                    <Building2 size={15} />
                    {department.managerTitle || "Department Head"}
                  </div>

                  <div className="meta-stat">
                    <DollarSign size={15} />
                    {formatCurrency(department.budget)}
                  </div>
                </div>
              </section>
            ))}
        </div>
      </main>
    </div>
  );
}

export default EmployeeDepartments;