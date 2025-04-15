const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Ruta za test
app.get('/', (req, res) => {
  res.send('Hello from backend!');
});

// Ruta za login
app.post('/login', (req, res) => {
  const { username, email, password } = req.body;

  // Učitaj user.json
  const usersPath = path.join(__dirname, 'user.json');
  let users;

  try {
    users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
  } catch (err) {
    return res.status(500).json({ message: 'Greška pri čitanju baze korisnika.' });
  }

  // Pronađi korisnika po username ili email + password
  const user = users.find(
    (u) =>
      (u.username === username || u.email === email) &&
      u.password === password
  );

  if (user) {
    res.status(200).json({ message: 'Login successful', user });
  } else {
    res.status(401).json({ message: 'Pogrešan email/username ili šifra' });
  }
});

// Pokretanje servera
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
