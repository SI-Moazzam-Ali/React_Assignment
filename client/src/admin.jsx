import React from 'react'
import Login from './login'
import HomeComp from './home'
import Navigation from './navigation'
import { Link } from 'react-router-dom'


const Admin = () => {
  return (
    <div style={{textAlign:"center"}}>
       <Link to="/" ><button>Back</button></Link>
      <hr/>
     
      <Login/>
      
      </div>
    
  )
}

export default Admin;