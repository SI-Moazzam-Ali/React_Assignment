import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeSelectionForm = () => {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVenue, setSelectedVenue] = useState('');
  const [selectedSport, setSelectedSport] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState('');
  const [startTime, setStartTime] = useState('14:00');
  const [endTime, setEndTime] = useState('15:00');
  const [selectedEquipmentQuantity, setSelectedEquipmentQuantity] = useState('');

  useEffect(() => {
    // Make an Axios GET request to fetch all data from the server
    axios.get('http://localhost:4000/allData')
      .then((response) => {
        // Set the retrieved data in the state
        setAllData(response.data);
        setLoading(false); // Data has been loaded
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false); // Data loading failed
      });
  }, []);

  const handleSelectedEquipmentChange = (event) => {
    const selectedEquipmentValue = event.target.value;
    setSelectedEquipment(selectedEquipmentValue);

    // Find the corresponding item data in the data
    const selectedItemData = allData.find((item) => item.equipment === selectedEquipmentValue);

    // Update the quantity state
    if (selectedItemData) {
      setSelectedEquipmentQuantity(selectedItemData.quantity);
    } else {
      setSelectedEquipmentQuantity('');
    }
  };

  return (
    <div>
      <h2>Select Options:</h2>
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="venue">Select Venue:</label>
            <select
              id="venue"
              value={selectedVenue}
              onChange={(e) => setSelectedVenue(e.target.value)}
              required
            >
              <option value="">Select a venue</option>
              {allData.map((item, index) => (
                <option key={index} value={item.venue}>
                  {item.venue}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="sports">Select Sport:</label>
            <select
              id="sports"
              value={selectedSport}
              onChange={(e) => setSelectedSport(e.target.value)}
              required
            >
              <option value="">Select a sport</option>
              {allData.map((item, index) => (
                <option key={index} value={item.sports}>
                  {item.sports}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="equipment">Select Equipment:</label>
            <select
              id="equipment"
              value={selectedEquipment}
              onChange={handleSelectedEquipmentChange}
              required
            >
              <option value="">Select equipment</option>
              {allData.map((item, index) => (
                <option key={index} value={item.equipment}>
                  {item.equipment}
                </option>
              ))}
            </select>
          </div>

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
              value={selectedEquipmentQuantity}
              readOnly
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeSelectionForm;
