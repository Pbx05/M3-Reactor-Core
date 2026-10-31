import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./style.css";

/**
 * Punto de entrada de la aplicación.
 * Inicializa el árbol de componentes mediante createRoot montándolo en el contenedor '#root'
 * y envuelve la raíz en <StrictMode> para verificar efectos secundarios e invocar comprobaciones de desarrollo.
 */
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
