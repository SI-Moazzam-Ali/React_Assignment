import React, {useState} from "react";
import HomeComp from "./home";
import Login from "./login";
import Register from "./register";
import { Link } from "react-router-dom";

const Employee = () => {
    const [showLogin, setShowLogin] = useState(true);

  const toggleComponent = () => {
    setShowLogin(!showLogin);
    
  };
    return (
        <div style={{textAlign:"center"}}>
          <Link to="/" ><button>Back</button></Link>
          <button onClick={toggleComponent} >{showLogin ? <h5>Register</h5> : <h5>Login</h5>}</button>
          <hr/> 
          {showLogin ? <Login /> : <Register /> }
        </div>
      );
};

export default Employee;
