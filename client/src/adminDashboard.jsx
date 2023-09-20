import React, { useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [venue, setVenue] = useState('');
  const [sports, setSports] = useState('');
  const [equipment, setEquipment] = useState('');
  const [startTime, setStartTime] = useState('14:00');
  const [endTime, setEndTime] = useState('15:00');
  const [quantity, setQuantity] = useState('');

  // Declare adminEquipmentArray state
  const [adminEquipmentArray, setAdminEquipmentArray] = useState([]);

  const addEquipment = () => {
    if (equipment) {
      setAdminEquipmentArray([...adminEquipmentArray, equipment]);
      setEquipment(''); // Clear the equipment input field
    }
  };

  const removeEquipment = () => {
    
      setAdminEquipmentArray([]);
      setEquipment('');
    
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      venue,
      sports,
      equipment: adminEquipmentArray, // Use adminEquipmentArray here
      startTime,
      endTime,
      quantity,
    };

    try {
      const response = await axios.post('http://localhost:4000/addsportequipment', formData);

      console.log('Server Response:', response.data);

      setVenue('');
      setSports('');
      setEquipment('');
      setStartTime('14:00');
      setEndTime('15:00');
      setQuantity('');
      setAdminEquipmentArray([]);
    } catch (error) {
      console.error('Error:', error);
      console.log("Error")
    }
  };

  return (
    
    <div className="hr-admin-form">
      <h2>Admin Dashboard</h2>
      <hr/>
      <form onSubmit={handleSubmit} className="form-group">
        <div >
          <label htmlFor="venue">Venue:</label>
          <input
            type="text"
            id="venue"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="sports">Sports:</label>
          <input
            type="text"
            id="sports"
            value={sports}
            onChange={(e) => setSports(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
  <label htmlFor="equipment">Admin Equipment (comma-separated):</label>
  <input
    type="text"
    id="equipment"
    value={equipment}
    onChange={(e) => setEquipment(e.target.value)}
    required={adminEquipmentArray.length === 0}
  />
  <button type="button" onClick={addEquipment}>Add Equipment</button>
  <button type="button" onClick={removeEquipment}>Clear</button>
</div>

{/* Display admin equipment array */}
{adminEquipmentArray.length > 0 && (
  <div className="form-group" >
    <label>Admin Equipment:</label>
    <ul>
      {adminEquipmentArray.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>
)}


        <div className="form-group">
          <label htmlFor="startTime">Start Time:</label>
          <input
            type="time"
            id="startTime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="endTime">End Time:</label>
          <input
            type="time"
            id="endTime"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
    
  );
};

export default AdminDashboard;
