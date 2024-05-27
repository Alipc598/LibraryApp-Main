import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import pkg from 'pg';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

config();

const { Pool } = pkg;

const app = express();
const port = process.env.PORT || 3000;
const secret = process.env.JWT_SECRET || 'a1B2c3D4e5F6g7H8i9J0kL1mN2oP3';

app.use(bodyParser.json());
app.use(cors());

// PostgreSQL pool setup
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
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

// Resolve __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve static files from the 'frontend' directory
app.use(express.static(join(__dirname, '..', 'frontend')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, '..', 'frontend', 'index.html'));
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

    console.log('Executing query:', query, 'with params:', params);
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching books:', err.message);
    res.status(500).send(err.message);
  }
});

app.post('/books', authenticateAdmin, async (req, res) => {
  const { title, author, genre } = req.body;
  console.log(`Attempting to add book with title: ${title}, author: ${author}, genre: ${genre}`);
  
  try {
    const result = await pool.query('INSERT INTO books (title, author, genre) VALUES ($1, $2, $3) RETURNING *', [title, author, genre]);
    console.log('Book added successfully:', result.rows[0]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error adding book:', err.message);
    res.status(500).send(err.message);
  }
});

app.patch('/books/:id', authenticateAdmin, async (req, res) => {
  const { id } = req.params;
  const { title, author, genre } = req.body;
  console.log(`Attempting to update book with id: ${id}, title: ${title}, author: ${author}, genre: ${genre}`);
  
  try {
    const result = await pool.query('UPDATE books SET title = $1, author = $2, genre = $3 WHERE id = $4 RETURNING *', [title, author, genre, id]);
    console.log('Book updated successfully:', result.rows[0]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating book:', err.message);
    res.status(500).send(err.message);
  }
});

app.delete('/books/:id', authenticateAdmin, async (req, res) => {
  const { id } = req.params;
  console.log(`Attempting to delete book with id: ${id}`);
  
  try {
    await pool.query('DELETE FROM books WHERE id = $1', [id]);
    console.log('Book deleted successfully');
    res.sendStatus(204);
  } catch (err) {
    console.error('Error deleting book:', err.message);
    res.status(500).send(err.message);
  }
});

app.post('/admin', async (req, res) => {
  const { username, password } = req.body;
  console.log(`Login attempt with username: ${username} and password: ${password}`);

  if (username === 'Admin' && password === '1234') {
    const token = jwt.sign({ username }, secret);
    console.log(`Login successful, generated token: ${token}`);
    res.json({ token });
  } else {
    console.log('Invalid credentials');
    res.status(401).send('Invalid credentials');
  }
});

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Serve the frontend HTML file for all unknown routes
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '..', 'frontend', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
