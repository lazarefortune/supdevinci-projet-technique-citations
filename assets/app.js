import "./bootstrap.js";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import "./scss/app.scss";
import "./elements/index";
import { QuoteProvider } from "./context/QuoteContext";
const root = document.getElementById("root");

if (root) {
  createRoot(root).render(
    <QuoteProvider>
      <App />
    </QuoteProvider>
  );
}
