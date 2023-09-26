import "./Dashboard.css";
import * as React from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

function Dashboard({ setToken }) {
  return (
    <>
      <nav>
        <NavBar setToken={setToken} />
      </nav>
      <div className="dashboard">
        <div className="dashboard-body">
          <div className="dashboard-inner">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
