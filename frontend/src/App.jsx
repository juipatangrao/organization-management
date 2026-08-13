import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Departments from "./pages/Departments";
import EmployeeDepartments from "./pages/EmployeeDepartments";
import { getUserRole } from "./utils/auth";

function Home() {
  const role = getUserRole();

  if (role === "employee") {
    return <EmployeeDepartments />;
  }

  return <Departments />;
}

function App() {
  return (
    <div className="app-layout">
      <Sidebar />

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/departments" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;