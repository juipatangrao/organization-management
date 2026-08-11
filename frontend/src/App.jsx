import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import PersonalSpace from "./pages/PersonalSpace";
import OrganizationOverview from "./pages/OrganizationOverview";
import Members from "./pages/Members";
import HRDashboard from "./pages/HRDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import Teams from "./pages/Teams";
import Groups from "./pages/Groups";
import OrganizationSettings from "./pages/OrganizationSettings";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =================================
            DEFAULT PAGE
        ================================== */}

        <Route
          path="/"
          element={
            <Navigate
              to="/personal"
              replace
            />
          }
        />


        {/* =================================
            PERSONAL SPACE
        ================================== */}

        <Route
          path="/personal"
          element={<PersonalSpace />}
        />


        {/* =================================
            ORGANIZATION OVERVIEW
        ================================== */}

        <Route
          path="/organization"
          element={
            <OrganizationOverview />
          }
        />


        {/* =================================
            MEMBERS
        ================================== */}

        <Route
          path="/organization/members"
          element={<Members />}
        />


        {/* =================================
            HR DASHBOARD
        ================================== */}

        <Route
          path="/organization/hr"
          element={
            <HRDashboard />
          }
        />


        {/* =================================
            EMPLOYEE DASHBOARD
        ================================== */}

        <Route
          path="/organization/employee"
          element={
            <EmployeeDashboard />
          }
        />


        {/* =================================
            TEAMS
        ================================== */}

        <Route
          path="/organization/teams"
          element={<Teams />}
        />


        {/* =================================
            GROUPS
        ================================== */}

        <Route
          path="/organization/groups"
          element={<Groups />}
        />


        {/* =================================
            ORGANIZATION SETTINGS
        ================================== */}

        <Route
          path="/organization/settings"
          element={
            <OrganizationSettings />
          }
        />


        {/* =================================
            FUTURE PAGES
        ================================== */}

        <Route
          path="/organization/roles"
          element={
            <div style={{ padding: "40px" }}>
              <h2>Roles & Permissions</h2>
              <p>
                This page will be created next.
              </p>
            </div>
          }
        />


        {/* =================================
            UNKNOWN ROUTE
        ================================== */}

        <Route
          path="*"
          element={
            <Navigate
              to="/personal"
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;