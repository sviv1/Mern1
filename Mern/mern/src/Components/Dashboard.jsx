import React from "react";
import { Link, Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./style.css"; // Import your custom CSS file
const Dashboard = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const handleLogout = () => {
    axios.get('http://localhost:3000/auth/logout')
      .then(result => {
        if (result.status) {
          localStorage.removeItem("valid");
          navigate('/adminlogin')
        }
      })
  }
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        {/* Sidebar */}
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark text-white min-vh-100">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-3">

            {/* Brand */}
            <Link
              to="/dashboard"
              className="d-flex align-items-center pb-3 mb-md-0 text-white text-decoration-none"
            >
              <i className="bi bi-code-slash fs-3 me-2"></i>
              <span className="fs-5 d-none d-sm-inline">Code With V22</span>
            </Link>

            {/* Sidebar Navigation */}
            <ul className="nav nav-pills flex-column w-100">
              <li className="nav-item w-100">
                <Link to="/dashboard" className="nav-link text-white px-3 py-2 w-100 rounded-2 bg-dark-hover">
                  <i className="bi bi-speedometer2 me-2"></i>
                  <span className="d-none d-sm-inline">Dashboard</span>
                </Link>
              </li>
              <li className="nav-item w-100">
                <Link to="/dashboard/employee" className="nav-link text-white px-3 py-2 w-100 rounded-2 bg-dark-hover">
                  <i className="bi bi-people me-2"></i>
                  <span className="d-none d-sm-inline">Manage Employees</span>
                </Link>
              </li>
              <li className="nav-item w-100">
                <Link to="/dashboard/category" className="nav-link text-white px-3 py-2 w-100 rounded-2 bg-dark-hover">
                  <i className="bi bi-tags me-2"></i>
                  <span className="d-none d-sm-inline">Category</span>
                </Link>
              </li>
              <li className="nav-item w-100">
                <Link to="/dashboard/profile" className="nav-link text-white px-3 py-2 w-100 rounded-2 bg-dark-hover">
                  <i className="bi bi-person me-2"></i>
                  <span className="d-none d-sm-inline">Profile</span>
                </Link>
              </li>
              <li className="nav-item w-100" onClick={handleLogout} style={{ cursor: 'pointer' }}>
                <div className="nav-link text-white px-3 py-2 w-100 rounded-2 bg-dark-hover">
                  <i className="bi bi-box-arrow-right me-2"></i>
                  <span className="d-none d-sm-inline">Logout</span>
                </div>
              </li>

            </ul>
          </div>
        </div>
        {/* Main Content Area */}
        <div className="col p-0 m-0">
          <div className="p-2 d-flex justify-content-center shadow">
            <h4>Employee Management System</h4>
          </div>
          <Outlet /> {/* Render child routes here */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
