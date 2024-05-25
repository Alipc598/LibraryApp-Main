# Library Application

## Description

A simple library application that allows users to register, login, and manage a list of books. Users can add, delete, search, and sort books. The application uses JWT for authentication.

## Features

- User registration and login
- JWT authentication for secure API requests
- CRUD operations for books
- Search and sort functionality for books
- Responsive and user-friendly interface

## Setup Instructions

### Prerequisites

- Node.js
- PostgreSQL

### Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```sh
   cd LibraryApp-Main
   ```

3. Install the dependencies:
   ```sh
   npm install
   ```

4. Set up the PostgreSQL database:
   - Create a new database named `library`.
   - Create `books` and `users` tables.

5. Create a `.env` file in the root directory and add the following environment variables:
   ```plaintext
   JWT_SECRET=your_jwt_secret
   DB_USER=your_db_user
   DB_HOST=localhost
   DB_NAME=library
   DB_PASSWORD=your_db_password
   DB_PORT=5432
   ```

6. Start the backend server:
   ```sh
   node server.js
   ```

### Usage

1. Open `login.html` in your browser to register and login.
2. Open `index.html` to manage books.

## API Documentation

### Register

- **URL:** `/register`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```

### Login

- **URL:** `/login`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```

### Get All Books

- **URL:** `/books`
- **Method:** `GET`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```

### Add Book

- **URL:** `/books`
- **Method:** `POST`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```
- **Body:**
  ```json
  {
    "title": "string",
    "author": "string",
    "genre": "string"
  }
  ```

### Delete Book

- **URL:** `/books/:id`
- **Method:** `DELETE`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```

