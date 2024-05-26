const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
require('dotenv').config(); 

const app = express();
const port = process.env.PORT || 3000;
const secret = 'a1B2c3D4e5F6g7H8i9J0kL1mN2oP3';

app.use(bodyParser.json());
app.use(cors());

// PostgreSQL pool setup
const pool = new Pool({
  user: 'postgres', 
  host: 'localhost',
  database: 'library',
  password: '1234', 
  port: 5432,
});

// Middleware for token authentication
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, secret, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Routes
app.get('/', (req, res) => {
  res.send('Library Application Backend');
});

app.get('/books', authenticateToken, async (req, res) => {
  try {
    const { title, author, genre } = req.query;
    let query = 'SELECT * FROM books WHERE 1=1';
    let params = [];

    if (title) {
      query += ' AND title ILIKE $' + (params.length + 1);
      params.push(`%${title}%`);
    }
    if (author) {
      query += ' AND author ILIKE $' + (params.length + 1);
      params.push(`%${author}%`);
    }
    if (genre) {
      query += ' AND genre ILIKE $' + (params.length + 1);
      params.push(`%${genre}%`);
    }

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post('/books', authenticateToken, async (req, res) => {
  const { title, author, genre } = req.body;
  try {
    const result = await pool.query('INSERT INTO books (title, author, genre) VALUES ($1, $2, $3) RETURNING *', [title, author, genre]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.delete('/books/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM books WHERE id = $1', [id]);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]);
    res.status(201).send('User registered');
  } catch (err) {
    console.error('Error registering user:', err.message); // Debugging
    res.status(500).send('Server error'); 
  }
});


app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    console.log('Login attempt:', username); // Debugging
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = result.rows[0];
    console.log('User found:', user); // Debugging
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ username: user.username }, secret);
      res.json({ token });
    } else {
      console.log('Invalid credentials'); // Debugging
      res.status(401).send('Invalid credentials');
    }
  } catch (err) {
    console.error('Server error:', err.message); // Debugging
    res.status(500).send('Server error'); 
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});