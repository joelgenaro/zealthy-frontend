import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import Onboarding from "./pages/Onboarding.jsx";
import Admin from "./pages/Admin.jsx";
import DataTable from "./pages/DataTable.jsx";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Onboarding />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/data" element={<DataTable />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
