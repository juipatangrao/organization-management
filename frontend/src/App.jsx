import { Routes, Route } from "react-router-dom";

import Departments from "./pages/Departments";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Departments />} />
      <Route path="/departments" element={<Departments />} />
    </Routes>
  );
}

export default App;