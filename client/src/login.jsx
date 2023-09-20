import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const username = useRef();
  const password = useRef();
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault(); // Prevent the form from submitting
    
    axios.post("http://localhost:4000/admincheck", {
      username: username.current.value,
      password: password.current.value,
    }).then((res) => {
      if (res.data === true && username.current.value === 'admin') {
        console.log("Welcome " + username.current.value)
        navigate("/admin/dashboard");
      } 
      else if (res.data === true && username.current.value !== 'admin') {
        console.log("Welcome " + username.current.value)
        navigate("/employee/dashboard")
      }
      else {
        alert("Wrong input");
        

      }
    });
  }

  return (
    <div className='login'>
      <h2>Login</h2>
      <form onSubmit={login}> {/* Attach the submit event handler to the form */}
        <div>
          <input
            type="text"
            name="username"
            ref={username}
            required
            placeholder='Username'
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            ref={password}
            required
            placeholder='Password'
          />
        </div>
        <button type="submit">Login</button> {/* Use a standard submit button */}
      </form>
    </div>
  );
};

export default Login;
