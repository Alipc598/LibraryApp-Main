# Library Application Prototype Proposal

## Project Description

The aim of this project is to develop a web application that serves as a book library catalog. The application consists of a REST API backend and a simple frontend interface. It caters to two types of users: public readers and a librarian.

### User Types and Functionalities

**Reader (No Authentication Required):**
- Browse books by genre, author, or title.

**Librarian (Authentication Required with admin credentials: Admin/1234):**
- Add new books to the catalog.
- Update information about existing books.
- Delete books from the catalog.

## REST API Endpoint Design

**Endpoints for Managing Books:**
- `GET /books` - List all books.
- `POST /books` - Add a new book (Admin only).
- `PATCH /books/:id` - Update an existing book (Admin only).
- `DELETE /books/:id` - Delete a book (Admin only).

**Endpoint for Authentication:**
- `POST /admin` - Authenticate as an admin.

## Project Plan

**Milestones:**
1. **Project setup and initial commit (Week 1)**:
   - Initialize the project repository.
   - Set up project structure.

2. **Backend development with REST API (Week 2-3)**:
   - Develop REST API endpoints for book management.
   - Implement PostgreSQL database integration.
   - Set up authentication using JWT.

3. **Frontend development (Week 4-5)**:
   - Develop the frontend interface using HTML, CSS, and JavaScript.
   - Integrate Alpine.js for interactivity.
   - Create pages for browsing books and admin functionalities.

4. **Integration and testing (Week 6)**:
   - Integrate frontend with backend.
   - Perform unit and integration testing.
   - Ensure all functionalities work as expected.

5. **Deployment and final testing (Week 7)**:
   - Deploy frontend on Heroku.
   - Deploy backend on Heroku.
   - Conduct final testing to ensure the application is fully functional.

6. **Documentation and submission (Week 8)**:
   - Write comprehensive documentation including setup instructions, usage guide, and project description.
   - Submit the project.


### Technologies Used

- **Front-end**: HTML, CSS, JavaScript, Alpine.js
- **Back-end**: Node.js, Express.js
- **Database**: PostgreSQL
- **Authentication**: JSON Web Tokens (JWT)
- **Deployment**:
  - Front-end: Heroku
  - Back-end: Heroku

### Key Features

- **Public Reader Features**:
  - Browse and search books by genre, author, or title without logging in.
  
- **Librarian Features**:
  - Authentication required using admin credentials (Admin/1234).
  - Add new books.
  - Update existing books.
  - Delete books.


### Deployment Links

https://library-ali-ica-65504487e559.herokuapp.com/


### Usage

1. **Public Access**:
   - Browse and search books without logging in.

2. **Admin Access**:
   - Log in using the admin credentials (Admin/1234) to add, update, or delete books.
