import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AlertProvider from "./contexts/alert/AlertProvider";
import "./index.css";
import AppRouter from "./routes/AppRouter";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AlertProvider>
      <AppRouter />
    </AlertProvider>
  </BrowserRouter>
);
