import React, { use } from 'react';
import axios from 'axios';
import { useState } from 'react';
import {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';






const AddEmployee = () => {

    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        password: '',
        salary: '',
        address: '',
        category_id: '', 
    });

    

   const [category, setCategory] = useState([]);
   const navigate= useNavigate();

   useEffect(() => {
     axios.get('http://localhost:3000/auth/category')
     .then(res=>{
            if(res.status === 200) {
                setCategory(res.data);
            }
            else {
                alert("Error fetching categories");
            }
     }).catch(err => {
        console.error(err);
     });
   },[]);


    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/auth/add_employee', employee)
        .then( res => {
            if(res.status === 200) {
                alert("Employee added successfully");
                navigate('/dashboard/employee');
            }
            else {
                alert("Error adding employee");
            }
        })
        .catch(err => console.error(err));
    }





    return (
        <div className='px-5 mt-3'>
            <div className='d-flex justify-content-center'>
                <h3>Add Employee</h3>
            </div>
            <form className='mt-3' onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor="name" className='form-label'>Name</label>
                    <input type="text" className='form-control' id='name' placeholder='Enter Name' 
                        onChange={(e) => setEmployee({...employee, name: e.target.value})}
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor="email" className='form-label'>Email</label>
                    <input type="email" className='form-control' id='email' placeholder='Enter Email' 
                           onChange={(e) => setEmployee({...employee, email: e.target.value})}
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor="password" className='form-label'>Password</label>
                    <input type="password" className='form-control' id='password' placeholder='Enter Password' 
                           onChange={(e) => setEmployee({...employee, password: e.target.value})}
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor="salary"  className='form-label'>Salary</label>
                    <input type="text" className='form-control' id='salary' placeholder='Enter Salary in INR' 
                           onChange={(e) => setEmployee({...employee, salary: e.target.value})}
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor="address" className='form-label'>Address</label>
                    <input type="text" className='form-control' id='address' placeholder='Enter Address' 
                           onChange={(e) => setEmployee({...employee, address: e.target.value})}
                    />
                </div>
                <div className='col-12'>
                 <label for="category" className='form-label'>Select Category</label>
                 <select name="category" id="category" className='form-select'
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
              
            
                <button type="submit" className='btn btn-primary'>Add Employee</button>
            </form>
        </div>
    );
}

export default AddEmployee;
