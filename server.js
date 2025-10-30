const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',      // your MySQL username
  password: 'Santhu@459',  // your MySQL password
  database: 'logindb'
});

db.connect(err => {
  if (err) throw err;
  console.log('✅ MySQL Connected...');
});

// Serve HTML form
app.get('/', (req, res) => {
  res.send(`
    <form action="/submit" method="post">
      <input type="text" name="name" placeholder="Enter Name" required><br>
      <input type="email" name="email" placeholder="Enter Email" required><br>
      <textarea name="message" placeholder="Enter Message"></textarea><br>
      <button type="submit">Submit</button>
    </form>
  `);
});

// Receive form data
app.post('/submit', (req, res) => {
  const { name, email, message } = req.body;
  const sql = 'INSERT INTO users (name, email, message) VALUES (?, ?, ?)';
  db.query(sql, [name, email, message], (err, result) => {
    if (err) throw err;
    console.log('✅ Data inserted:', result.insertId);
    res.send('Form data saved successfully!');
  });
});

// Start server
app.listen(port, () => console.log(`🚀  Server running on http://localhost:${port}`));
