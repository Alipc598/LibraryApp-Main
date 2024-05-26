const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const secret = process.env.JWT_SECRET || 'a1B2c3D4e5F6g7H8i9J0kL1mN2oP3';

app.use(bodyParser.json());
app.use(cors());

// PostgreSQL pool setup
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'library',
  password: process.env.DB_PASSWORD || '1234',
  port: process.env.DB_PORT || 5432,
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

// Middleware for admin authentication
function authenticateAdmin(req, res, next) {
  authenticateToken(req, res, () => {
    if (req.user.username === 'Admin') {
      next();
    } else {
      res.sendStatus(403);
    }
  });
}

// Routes
app.get('/', (req, res) => {
  res.send('Library Application Backend');
});

app.get('/books', async (req, res) => {
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

app.post('/books', authenticateAdmin, async (req, res) => {
  const { title, author, genre } = req.body;
  try {
    const result = await pool.query('INSERT INTO books (title, author, genre) VALUES ($1, $2, $3) RETURNING *', [title, author, genre]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.patch('/books/:id', authenticateAdmin, async (req, res) => {
  const { id } = req.params;
  const { title, author, genre } = req.body;
  try {
    const result = await pool.query('UPDATE books SET title = $1, author = $2, genre = $3 WHERE id = $4 RETURNING *', [title, author, genre, id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.delete('/books/:id', authenticateAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM books WHERE id = $1', [id]);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post('/admin', async (req, res) => {
  const { username, password } = req.body;
  if (username === 'Admin' && password === '1234') {
    const token = jwt.sign({ username }, secret);
    res.json({ token });
  } else {
    res.status(401).send('Invalid credentials');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});