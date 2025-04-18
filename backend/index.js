const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// LOGIN
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  console.log("🛂 Login data received:", { username, password });

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  try {
    const [rows] = await db.execute(
      'SELECT * FROM users WHERE username = ? AND password = ?',
      [username, password]
    );

    if (rows.length > 0) {
      res.status(200).json({ message: 'Login successful', user: rows[0] });
    } else {
      res.status(401).json({ message: 'Invalid username or password.' });
    }
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Database error during login.' });
  }
});


// REGISTER
app.post('/register', async (req, res) => {
  const { email, username, password } = req.body;

  console.log('Register input:', { email, username, password });

  if (!email || !username || !password) {
    console.log("❌ Missing fields:", { email, username, password });
    return res.status(400).json({ message: 'All fields are required.' });
  }

  if (
    typeof email !== 'string' ||
    typeof username !== 'string' ||
    typeof password !== 'string'
  ) {
    console.log("❌ Invalid data types");
    return res.status(400).json({ message: 'Invalid data format.' });
  }

  try {
    const [existingRows] = await db.execute(
      'SELECT * FROM users WHERE email = ? OR username = ?',
      [email, username]
    );

    if (existingRows.length > 0) {
      return res.status(409).json({ message: 'Email or username is already in use.' });
    }

    await db.execute(
      'INSERT INTO users (email, username, password) VALUES (?, ?, ?)',
      [email, username, password]
    );

    res.status(201).json({ message: 'Registration successful!' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Database error during registration.' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
