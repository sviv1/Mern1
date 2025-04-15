import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Homepage = () => {
  const [data, setData] = useState({
    total_admins: 1,
    total_employees: 0,
    total_salary: 0,
  });

  // const [data, setData] = useState({
  //   total_admins: 10,
  //   total_employees: 20,
  //   total_salary: 50000,
  // });
  

  useEffect(() => {
    // Fetch total admins
    axios.get('http://localhost:3000/auth/admin_count')
      .then(res => setData(prev => ({ ...prev, total_admins: res.data.total_admins })))
      .catch(err => console.error(err));

    // Fetch total employees
    axios.get('http://localhost:3000/auth/employee_count')
      .then(res => setData(prev => ({ ...prev, total_employees: res.data.total_employees })))
      .catch(err => console.error(err));

    // Fetch total salary
    axios.get('http://localhost:3000/auth/total_salary')
      .then(res => setData(prev => ({ ...prev, total_salary: res.data.total_salary })))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Dashboard Overview</h2>
      <div className="row">
        <div className="col-md-4">
          <div className="card text-white bg-primary mb-3">
            <div className="card-body">
              <h5 className="card-title">Total Admins</h5>
              <p className="card-text">{data.total_admins}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-success mb-3">
            <div className="card-body">
              <h5 className="card-title">Total Employees</h5>
              <p className="card-text">{data.total_employees}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-warning mb-3">
            <div className="card-body">
              <h5 className="card-title">Total Salary</h5>
              <p className="card-text">₹ {data.total_salary}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
