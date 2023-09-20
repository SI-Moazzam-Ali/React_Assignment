// App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import Login from "./login";
import Register from "./register";
import Navigation from "./navigation"; // Import your Navigation component
import HomeComp from "./home";
import Employee from "./employee";
import Admin from "./admin";
import EmpDashboard from "./empDashboard";
import AdminDashboard from "./adminDashboard";
import EmployeeSelectionForm from "./practice";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeComp />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/employee/login" element={<Login />} />
          <Route path="/employee/register" element={<Register />} />
          <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
          <Route path="/employee" element={<Employee />}>
            <Route index element={<Employee/>} />
          
            {/* Other employee-related routes */}
          </Route>
          <Route path="/prac" element={<EmployeeSelectionForm/>}/>
          <Route path="/admin" element={<Admin />} />
          <Route path="/employee/dashboard" element={<EmpDashboard/>}/>
        
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
