import React from 'react';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/auth/add_category', { category:categoryName })
    .then(res => {
       if(res.status === 200) {
        navigate('/dashboard/category');
      }
    else {
        alert("Category already exists");
      }
}).catch(err => {
        console.error(err);
        alert("Error adding category");
      });
    }

  

  return (
    <div className="d-flex justify-content-center align-items-center h-75">
       
          <div className='p-3 rounded w-50 border'>
            <h2>Add Category</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="categoryName" className="form-label"><strong>Category Name</strong></label>
                <input type="text" className="form-control rounded-0" placeholder="Enter category name" onChange={(e) => setCategoryName(e.target.value)}/>
              </div>
              <button type="submit" className="btn btn-primary w-100 rounded-2 mb-2">Add Category</button> 
            </form>
          </div>
    </div>
  );
}

export default AddCategory;