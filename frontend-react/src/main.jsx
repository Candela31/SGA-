import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import tema from "./tema.js"
import "./index.css";
import "./styles/formulario.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={tema} defaultMode="system">
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);