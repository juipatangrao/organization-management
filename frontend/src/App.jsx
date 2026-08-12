import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Departments from "./pages/Departments";
import DepartmentDetail from "./pages/DepartmentDetail";
import Placeholder from "./pages/Placeholder";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/organization/departments" element={<Departments />} />
          <Route path="/organization/departments/:id" element={<DepartmentDetail />} />

          <Route
            path="/employees"
            element={<Placeholder title="Employees" icon="👥" />}
          />
          <Route path="/tasks" element={<Placeholder title="Tasks" icon="✅" />} />
          <Route path="/projects" element={<Placeholder title="Projects" icon="📁" />} />
          <Route
            path="/productivity"
            element={<Placeholder title="Productivity" icon="📈" />}
          />
          <Route
            path="/ai-manager"
            element={<Placeholder title="AI Manager" icon="🤖" description="Pro feature — coming soon." />}
          />
          <Route
            path="/collaboration"
            element={<Placeholder title="Collaboration" icon="💬" />}
          />
          <Route path="/calendar" element={<Placeholder title="Calendar" icon="📅" />} />
          <Route path="/documents" element={<Placeholder title="Documents" icon="📄" />} />

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;