import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Layout from "./components/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { UserContextProvider } from "./context/UserContext";
import "./main.css";
import LoggedIn from "./components/LoggedIn";
import LoggedOut from "./components/LoggedOut";

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index={true} element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logged-in" element={<LoggedIn />} />
          <Route path="/logged-out" element={<LoggedOut />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </UserContextProvider>
);
