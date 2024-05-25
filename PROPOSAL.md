# Library Application Prototype Proposal

## Project Description

The aim of this project is to develop a web application that serves as a book library catalog. The application will consist of a REST API backend and a simple frontend interface. It will cater to two types of users: public readers and librarians.

### User Types and Functionalities

**Reader (No Authentication Required):**
- Browse books by genre, author, or title.

**Librarian (Authentication Required):**
- Add new books to the catalog.
- Update information about existing books.
- Delete books from the catalog.

## REST API Endpoint Design

**Endpoints for Managing Books:**
- `GET /books` - List all books.
- `POST /books` - Add a new book.
- `PATCH /books/:id` - Update an existing book.
- `DELETE /books/:id` - Delete a book.

## Project Plan

**Milestones:**
1. Project setup and initial commit (Week 1).
2. Backend development with REST API (Week 2-3).
3. Frontend development (Week 4-5).
4. Integration and testing (Week 6).
5. Deployment and final testing (Week 7).
6. Documentation and submission (Week 8).
