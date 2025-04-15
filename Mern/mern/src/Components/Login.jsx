import React from 'react';
import './style.css';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    }) 
   const navigate = useNavigate();
   axios.defaults.withCredentials = true;
    const handleSubmit = async (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/auth/adminlogin', values).
        then((res) => {
          if(res.status === 200) { 
          navigate('/dashboard');
          }  
        }).catch((err) => {
            if(err.response){
                if(err.response.status === 401){
                    alert("Invalid email or password");
                }
            }else{
                console.log(err);
                alert("Internal server error");
            }
        });
    }

    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='loginForm shadow-lg p-3 mb-5 bg-body rounded'>
                <h2> Login Page</h2>
                 <form onSubmit = {handleSubmit}>
                    <div classname='mb-3'>
                        <label htmlFor='email'><strong>Email:</strong></label>
                        <input type='email' name='email' autoComplete='off' placeholder='Enter Email' 
                       onChange={(e)=>setValues({...values,email : e.target.value})} className="form-control rounded-0" required />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password'><strong>Password:</strong></label>
                        <input type='password' name='password' placeholder='Enter Password' 
                      onChange={(e)=>setValues({...values,password : e.target.value})} className="form-control rounded-0" required />
                    </div>
                    <button type='submit' className="btn btn-success w-100 rounded-0">Login</button>
                 </form>
            </div>
        </div>
    )
};

export default Login;