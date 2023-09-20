import React, { useState } from 'react';
import axios from 'axios'; // Import axios

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const { username, password, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      // Handle password mismatch error
      alert("Password does not match");
      console.log("Wrong password");
      return;
    }

    try {
      // Make a POST request to your server
      const response = await axios.post('http://localhost:4000/adduser', {
        username,
        password
      });

      console.log('Server Response:', response.data);
      // Handle success or redirect to login page
      window.location.href = '/employee/dashboard';
      console.log("Registered!");
      
    } catch (error) {
      console.error('Error:', error);
      // Handle error
      console.log("Error")
    }
  };

  return (
    <div style={{ margin: '10px', textAlign: 'center' }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
            required
            placeholder="Username"
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
            placeholder="Password"
          />
        </div>
        <div>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            required
            placeholder="Confirm Password"
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
