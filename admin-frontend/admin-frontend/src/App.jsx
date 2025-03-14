// admin-frontend/src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./Context/theme";
import Dashboard from "./Pages/Dashboard"; // Create this

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          {/* Add other routes here */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
