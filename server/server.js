const express = require("express");
const cors = require("cors");
const pool = require("./database");
// const passport = require("passport");
// const LocalStrategy = require("passport-local").Strategy;
// const session = require("express-session");
// const flash = require("express-flash");
const path = require("path");
const app = express();

app.use(cors());
const bodyparser = require("body-parser")
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:false}))

app.use(express.static(path.join(__dirname, '../public')));



//=================================================================================
//Login


  datas = {}
  pool.connect()
  // for admin
  let adminusername = ""
  let adminpass = ""
  let admindata = {}
  
  async function admincheck(){
      const res = await pool.query(`SELECT * FROM accounts where "username"='${adminusername}' and password='${adminpass}'; `)
      admindata = res.rows[0]
  }
  app.get('/api',(req,res)=>{
      res.json("hii");
  })

  app.post("/postreq",(req,res)=>{
      datas = req.body
      console.log("received response")
  })

  app.post("/admincheck",(req,res)=>{
      adminusername = req.body.username
      adminpass = req.body.password
      admincheck().then(()=>{
      if( admindata==undefined){
          res.send(false);
          console.log(adminusername);
          console.log(adminpass);
          console.log("Authentication Failed!")
      }
      else {
          res.send(true);
          console.log(adminusername);
          console.log(adminpass)
          console.log("Authentication Successful!")
      }
      
  })})





//================================================================================================
/// REGISTER
app.post("/adduser", (req, res) => {
  const username = req.body["username"];
  const password = req.body["password"];

  console.log("Username:" + username);

  console.log("Password:" + password);

  const insertSTMT = `INSERT INTO accounts ( username, password ) VALUES ( '${username}', '${password}');`;

  pool
    .query(insertSTMT)
    .then((response) => {
      console.log("Data Saved");
      console.log(response);
      res.send("User registered successfully");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error registering user");
    });
});


//================================================================================================
//Admin Dashboard

app.use(bodyparser.json());

app.post("/addsportequipment", (req, res) => {
  const venue = req.body["venue"];
  const sports = req.body["sports"];
  const equipment = req.body["equipment"]; // Now this is an array
  const startTime = req.body["startTime"];
  const endTime = req.body["endTime"];
  const quantity = req.body["quantity"];

  console.log('Venue: ' + venue);
  console.log('Sports: ' + sports);
  console.log('Equipment: ' + equipment);
  console.log('Start Time: ' + startTime);
  console.log('End Time: ' + endTime);
  console.log('Quantity: ' + quantity);

  // Construct the SQL query to insert data into your database
  const insertQuery = `
    INSERT INTO details (venue, sports, equipment, start_time, end_time, quantity)
    VALUES ($1, $2, $3, $4, $5, $6)
  `;

  // Execute the SQL query with parameterized values
  pool
    .query(insertQuery, [venue, sports, equipment, startTime, endTime, quantity])
    .then((response) => {
      console.log('Data Saved');
      console.log(response);
      res.status(200).json({ message: 'Data saved successfully' });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while saving the data' });
    });
});
 


// app.post("/addsportequipment", (req, res) => {
//   const venue = req.body["venue"];
//   const sports = req.body["sports"];
//   const equipment = req.body["equipment"];
//   const startTime = req.body["startTime"];
//   const endTime = req.body["endTime"];
//   const quantity = req.body["quantity"];
//   const employeeEquipment = req.body["employeeEquipment"];

//   console.log("Venue: " + venue);
//   console.log("Sports: " + sports);
//   console.log("Equipment: " + equipment);
//   console.log("Start Time: " + startTime);
//   console.log("End Time: " + endTime);
//   console.log("Quantity: " + quantity);
//   console.log("Employee Equipment: " + JSON.stringify(employeeEquipment));

//   const insertQuery = `INSERT INTO details (venue, sports, equipment, start_time, end_time, quantity, employee_equipment) VALUES ('${venue}','${sports}','${equipment}',${startTime}','${endTime}','${quantity}');`;

//   pool
//   .query(insertQuery)
//   .then((response) => {
//       console.log("Data Saved");
//       console.log(response);
//   })
  
//   .catch((err) => {
//       console.log(err);
//   });

//   console.log(req.body);
//   res.send("Response Received:" + req.body);
// });




//=========================================================================================
//Employee Dashboard

datas = {}
pool.connect()
// for admin


 
app.post('/submitData', (req, res) => {
  const {adminusername, venue, sports, equipment, startTime, endTime, quantity } = req.body;

  // Construct the SQL query to insert data into your database
  const insertQuery = `
    INSERT INTO public."employeeDetails" (emp_name, venue, sports, equipment, start_time, end_time, quantity)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
  `;

  // Execute the SQL query with parameterized values
  pool
    .query(insertQuery, [adminusername, venue, sports, equipment, startTime, endTime, quantity])
    .then(() => {
      console.log('Data Saved');
      res.status(200).json({ message: 'Data saved successfully' });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while saving the data' });
    });
});

// app.post("/addequipment",(req,res) => {
//   const sport = req.body ["sport"];
//   const equipment = req.body ["equipment"];
//   const quantity = req.body ["quantity"];
  










// Handle GET request to fetch data
// Route to fetch all data
app.get('/allData', (req, res) => {
  // Execute a SQL query to fetch all data
  pool.query('SELECT DISTINCT venue, sports, equipment FROM details;', (error, results) => {
    if (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred while fetching data' });
    } else {
      // Extract the data from the database results
      const data = results.rows;

      // Send the data as a JSON response
      res.json(data);
    }
  });
});



// Other routes and code for handling requests can go here




//   console.log("sport:" +sport);
//   console.log("equipment:" +equipment);
//   console.log("quantity" +quantity);
  

  
//   const insertEquipment = `INSERT INTO equipment (sport,equipment,quantity) VALUES ('${sport}', '${equipment}', '${quantity}');`

//   pool
//   .query(insertEquipment)
//   .then((response) => {
//       console.log("Data Saved");
//       console.log(response);
//   })
  
//   .catch((err) => {
//       console.log(err);
//   });

//   console.log(req.body);
//   res.send("Response Received:" + req.body);
// });






app.listen(4000, () => console.log("Server on localhost:4000"));
