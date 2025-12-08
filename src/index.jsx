import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app/App";
import 'bootstrap/dist/css/bootstrap.min.css'
import "../styles.css";

createRoot(document.getElementById("root")).render(
    
        <App />
    
);
