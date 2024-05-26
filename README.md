# Library Application

You can access the deployed application [here](https://ica1-waad-library-ali.netlify.app/).

Make sure to **Start the back-end server locally on port 3000** for the application to be fully functional:

```sh
node backend/server.js
```

## Overview

This is a simple library application that allows users to register, log in, add books, search books, and delete books. The application is deployed on Netlify.

## Features

- User registration and login
- JWT authentication
- Add new books
- Search books by title, author, or genre
- Delete books
- Sort books by title, author, or genre

## Technologies Used

- Front-end: HTML, CSS, JavaScript, Alpine.js
- Back-end: Node.js, Express.js
- Database: PostgreSQL
- Authentication: JSON Web Tokens (JWT)
- Deployment: Netlify for front-end

## Setup Instructions

### Prerequisites

- Node.js and npm installed
- PostgreSQL installed and running

### Installation

1. **Clone the repository:**

```sh
git clone https://github.com/your-username/LibraryApp-Main.git
cd LibraryApp-Main
```

2. **Install dependencies:**

```sh
npm install
```

3. **Set up the PostgreSQL database:**

```sh
psql -U postgres
CREATE DATABASE library;
```

4. **Create the `books` and `users` tables:**

```sql
\c library
CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100),
  author VARCHAR(100),
  genre VARCHAR(50)
);
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL
);
```

### Running the Application

1. **Start the back-end server locally on port 3000:**

```sh
node backend/server.js
```

2. **Access the front-end:**

- The front-end is deployed at [https://ica1-waad-library-ali.netlify.app/](https://ica1-waad-library-ali.netlify.app/).

### Usage

1. **Register a new user.**
2. **Log in with the registered user.**
3. **Add, search, and delete books as needed.**
```
