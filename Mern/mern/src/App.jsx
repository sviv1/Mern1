import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Components/Login'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import Dashboard from './Components/Dashboard'
import Home from './Components/Home'
import Employee from './Components/Employee'
import Category from './Components/Category'
import Profile from './Components/Profile'
import AddCategory from './Components/AddCategory'
import AddEmployee from './Components/AddEmployee'
import EditEmployee from './Components/EditEmployee'

function App() {
  const [count, setCount] = useState(0)
  return (
      <BrowserRouter> 
      <Routes>
        <Route path="/adminlogin" element={<Login />}></Route>
        {/* Add more routes here as needed */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="" element={<Home/>}></Route>
          <Route path="/dashboard/employee" element={<Employee/>}></Route>
          <Route path="/dashboard/category" element={<Category/>}></Route>
          <Route path="/dashboard/profile" element={<Profile/>}></Route>
          <Route path="/dashboard/add_category" element={<AddCategory/>}></Route>
          <Route path="/dashboard/add_employee" element={<AddEmployee/>}></Route>
          <Route path="/dashboard/edit_employee/:id" element={<EditEmployee/>}></Route>  
        </Route>
      </Routes>
      </BrowserRouter>
  )
}

export default App
