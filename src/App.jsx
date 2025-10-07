import React, { useEffect } from "react";

import Dashboard from "./components/Dashboard";
import "./dashboard.css";
import "./index.css";

function App() {
  useEffect(() => {
    document.title = "Kanarownik Solvro";
  }, []);

  return (
    <div className="app">
      <header>
        <h1>Kanarkowy Panel Kontrolny</h1>
      </header>
      <Dashboard />
    </div>
  );
}

export default App;
