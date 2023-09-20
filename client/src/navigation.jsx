// Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      
      <Link to="/admin" ><button>Admin</button></Link>
       
      <Link to="/employee" ><button>Employee</button></Link>

     
        
    </nav>
  );
};

export default Navigation;
