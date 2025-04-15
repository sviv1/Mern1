import React from 'react'
import { useParams } from 'react-router-dom';
import {useState} from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditEmployee = () => {
 
      
        const [category, setCategory] = useState([]);
        const { id } = useParams();
        const [employee, setEmployee] = useState({
            name: '',
            email: '',
            salary: '',
            address: '',
            category_id: '', 
        });

        useEffect(() => {
          // Fetch categories
          axios.get('http://localhost:3000/auth/category')
            .then(res => {
              if (res.status === 200) {
                setCategory(res.data);
              } else {
                alert("Error fetching categories");
              }
            })
            .catch(err => {
              console.error("Category fetch error:", err);
            });
        
          // Fetch employee data
          axios.get(`http://localhost:3000/auth/employee/${id}`)
            .then(res => {
              if (res.status === 200) {
                // ⚠️ DO NOT spread the previous employee state here
                console.log(res.data);
                setEmployee({
                  name: res.data.name || '',
                  email: res.data.email || '',
                  salary: res.data.salary || '',
                  address: res.data.address || '',
                  category_id: res.data.category_id || '',
                });
              } else {
                alert("Error fetching employee data");
              }
            })
            .catch(err => {
              console.error("Employee fetch error:", err);
            });
        
        }, [id]); // ✅ Depend only on `id`
        

  const navigate = useNavigate();

  const handleSubmit= (e) =>{
    e.preventDefault();
    axios.put(`http://localhost:3000/auth/edit_employee/${id}`, employee)
    .then(res => {
        if(res.status === 200) {
            alert("Employee updated successfully");
            // navigate('/dashboard/employee');
        } else {
            alert("Error updating employee data");
        }
    }).catch(err => {
        console.error(err);
    });
  }
    
  return (
    <div className='px-5 mt-3'>
    <div className='d-flex justify-content-center'>
        <h3>Edit Employee</h3>
    </div>
    <form className='mt-3' onSubmit={handleSubmit}>
        <div className='mb-3'>
            <label htmlFor="name" className='form-label'>Name</label>
            <input type="text" className='form-control' id='name' placeholder='Enter Name'
                value={employee.name}
                onChange={(e) => setEmployee({...employee, name: e.target.value})}
            />
        </div>
        <div className='mb-3'>
            <label htmlFor="email" className='form-label'>Email</label>
            <input type="email" className='form-control' id='email' placeholder='Enter Email' 
                    value={employee.email}
                   onChange={(e) => setEmployee({...employee, email: e.target.value})}
            />
        </div>
        <div className='mb-3'>
            <label htmlFor="salary"  className='form-label'>Salary</label>
            <input type="text" className='form-control' id='salary' placeholder='Enter Salary in INR' 
                    value={employee.salary}
                   onChange={(e) => setEmployee({...employee, salary: e.target.value})}
            />
        </div>
        <div className='mb-3'>
            <label htmlFor="address" className='form-label'>Address</label>
            <input type="text" className='form-control' id='address' placeholder='Enter Address' 
                    value={employee.address}
                   onChange={(e) => setEmployee({...employee, address: e.target.value})}
            />
        </div>
        <div className='col-12'>
         <label for="category" className='form-label'>Select Category</label>
         <select name="category" id="category" className='form-select'
                value={employee.category_id}
                    onChange={(e) => setEmployee({...employee, category_id: e.target.value})}
         >
  
            {
                category.map(c=> {
                    return (
                        <option key={c.id}  value={c.id}> {c.name} </option>
                    )
                })
            }
        </select>
        </div>
        <button type="submit" className='btn btn-primary mt-5'>Edit Employee</button>
    </form>
</div>
  )
}

export default EditEmployee;