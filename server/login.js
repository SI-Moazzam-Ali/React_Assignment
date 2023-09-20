const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('./database');

const app = express();
const port = 4000;
const cors = require('cors');

// ...

// Use CORS middleware
app.use(cors());


app.use(bodyParser.urlencoded({ extended: true }));

// Replace these with your actual database connection details


app.post('/employee/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const client = await pool.connect();

    // Check if the user exists in the database
    const result = await client.query(
      'SELECT * FROM users WHERE username = $1 AND password = $2',
      [username, password]
    );

    client.release();

    if (result.rows.length === 1) {
      // Successful login
      res.status(200).json({ message: 'Success' });
    } else {
      // Authentication failure
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
