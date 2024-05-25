const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;
const SECRET_KEY = 'your_secret_key'; // Change this to a more secure key

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// PostgreSQL pool setup
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'library',
  password: '1234',
  port: 5432,
});

// Test route
app.get('/', (req, res) => {
  res.send('Library Application Backend');
});

// Register a new user
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [username, hashedPassword]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Login a user
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (result.rows.length === 0) {
      return res.status(400).send('User not found');
    }

    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).send('Invalid password');
    }

    const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Middleware to authenticate the token
function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).send('Access denied');

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).send('Invalid token');
    req.user = user;
    next();
  });
}

// Protect the routes below with the authentication middleware
app.use(authenticateToken);

// Get all books or search books
app.get('/books', async (req, res) => {
  const { title, author, genre } = req.query;
  try {
    let query = 'SELECT * FROM books';
    const params = [];
    const conditions = [];

    if (title) {
      params.push(`%${title}%`);
      conditions.push(`title ILIKE $${params.length}`);
    }
    if (author) {
      params.push(`%${author}%`);
      conditions.push(`author ILIKE $${params.length}`);
    }
    if (genre) {
      params.push(`%${genre}%`);
      conditions.push(`genre ILIKE $${params.length}`);
    }
    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Add a new book
app.post('/books', async (req, res) => {
  const { title, author, genre } = req.body;
  try {
    const result = await pool.query('INSERT INTO books (title, author, genre) VALUES ($1, $2, $3) RETURNING *', [title, author, genre]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Update an existing book
app.patch('/books/:id', async (req, res) => {
  const { id } = req.params;
  const { title, author, genre } = req.body;
  try {
    const result = await pool.query('UPDATE books SET title = $1, author = $2, genre = $3 WHERE id = $4 RETURNING *', [title, author, genre, id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Delete a book
app.delete('/books/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM books WHERE id = $1', [id]);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
