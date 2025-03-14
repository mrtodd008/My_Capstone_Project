import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ErrorBoundary from "../../../Shared/Components/ErrorBoundary.jsx";

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <ErrorBoundary>
      <StrictMode>
        <App />
      </StrictMode>
    </ErrorBoundary>
  );
} else {
  console.error("Root element not found");
}
