import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react'; 
// import { useNavigate } from 'react-router-dom';

const Employee = () => {
  const [employee, setEmployee] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3000/auth/employee')
      .then(res => {
        if (res.status === 200) {
          setEmployee(res.data);
        }
        else {
          alert("Error fetching employee data");
        }
      }).catch(err => {
        console.error(err);
      });
  }, [])

  // const navigate = useNavigate();

 const handleDelete = (id) => {
  console.log("sdfsdf");
   axios.delete(`http://localhost:3000/auth/delete_employee/${id}`)
     .then(res => {
       if(res.status === 200){
         alert("Employee deleted successfully");
         window.location.reload();
     }
    else{
      alert("Error deleting employee");
    }
 }).catch(
       err=>{
       console.log(err);
       }
     );
 }




  return (
    <div className="px-5 mt-3">
      <div className='d-flex justify-content-center'>
        <h3>Employee List</h3>
      </div>
      <Link to="/dashboard/add_employee" className='btn btn-success mt-3 px-2'>Add Employee</Link>
      <div className='table-responsive mt-3'>
        <table className='table table-bordered table-striped'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Salary</th>
              <th>Address</th>
              <th>Category ID</th>
            </tr>
          </thead>
          <tbody>
            {employee.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.salary}</td>
                <td>{emp.address}</td>
                <td>{emp.category_id}</td>
                <td>
                  <Link to={"/dashboard/edit_employee/" + emp.id} className='btn btn-info btn-sm m-1'>Edit</Link>
                  <button className='btn btn-warning btn-sm m-1' onClick={ () => handleDelete(emp.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
      <div>

      </div>

    </div>
  );
}
export default Employee;