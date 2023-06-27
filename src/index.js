import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from '@clerk/nextjs'


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ClerkProvider>
        <App />
      </ClerkProvider>
    </BrowserRouter>
  </React.StrictMode>
);
