### Demo Video

Watch the demo video by clicking the image below:

[![Watch the video](https://i.imgur.com/AcVQEDv_d.webp?maxwidth=1520&fidelity=grand)](https://streamable.com/f9h9l1)

# Library Application

You can access the deployed application [here](https://library-ali-ica-65504487e559.herokuapp.com/).

## Important Notes

- **Admin Username:** Admin
- **Admin Password:** 1234


## Overview

This is a simple library application that allows users to browse and search books. Admin users can log in to add, delete, and edit books. The application is deployed on Heroku.

## Features

- Admin login
- JWT authentication for admin actions
- Browse and search books by title, author, or genre
- Add new books (Admin only)
- Delete books (Admin only)
- Sort books by title, author, or genre

## Technologies Used

- Front-end: HTML, CSS, JavaScript, Alpine.js
- Back-end: Node.js, Express.js
- Database: PostgreSQL
- Authentication: JSON Web Tokens (JWT)
- Deployment: Heroku 

## Setup Instructions

### Prerequisites

- Node.js and npm installed
- PostgreSQL installed and running

### Installation

1. **Clone the repository:**

```sh
git clone https://github.com/Alipc598/LibraryApp-Main.git
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

```sh
cd frontend
python -m http.server 8000
```

### Usage

1. **Log in as an admin user.**
2. **Browse and search books.**
3. **Add, search, and delete books as needed (Admin only).**

## Self-Evaluation

### Overview

The library application project aimed to create a web application where users can browse books and librarians can manage the book catalog. The project included developing both a frontend interface and a backend API. This self-evaluation will cover the project steps, highlight the trickiest part, and provide a critical self-assessment of the entire process.

### Project Steps and Evaluation

1. **Project Setup and Initial Commit**:
   - Successfully set up the project repository and structure.
   - Initializing the project went smoothly without any issues.

2. **Backend Development with REST API**:
   - Developed REST API endpoints for managing books.
   - Integrated PostgreSQL for data storage.
   - Implemented JWT authentication for securing admin functionalities.
   - This phase was completed on time and met all the requirements.

3. **Frontend Development**:
   - Created a simple yet functional user interface using HTML, CSS, and JavaScript.
   - Used Alpine.js for interactive elements.
   - Ensured the UI was responsive and user-friendly.
   - Completed the frontend development within the planned timeline.

4. **Integration and Testing**:
   - Integrated the frontend with the backend.
   - Conducted unit and integration testing.
   - Ensured all functionalities worked as expected.
   - Identified and fixed minor bugs during testing.
   - This step required more time than expected but was completed successfully.

5. **Deployment and Final Testing**:
   - Deployed the frontend on Heroku without any major issues.
   - Encountered significant challenges while deploying the backend on Heroku due to compatibility issues.
   - Explored other deployment options but faced limitations with free services.
   - Ultimately, the backend needs to be run locally for full functionality.
   - This phase was the most challenging and did not meet the initial expectation of having a fully deployed backend.

   Update: The backend was deployed to Heroku.

6. **Documentation and Submission**:
   - Prepared comprehensive documentation including setup instructions and usage guide.
   - Submitted the project with all required details.
   - This phase was completed successfully and on time.

### Tricky Part: Deploying the Backend

Deploying the backend was the trickiest part of this project. Most of the hosting services were not free or had limitations that affected functionality. Free services either did not support the required features or had compatibility issues with the backend code. Consequently, the backend server needs to be run locally, which is not ideal but necessary under the current circumstances.

Update: Finally managed to deploy on Heroku.

### Critical Self-Evaluation

The project setup and development phases went well. The backend API was implemented efficiently and met all the functional requirements. The frontend development was straightforward, and the integration between the frontend and backend was smooth. However, the deployment phase highlighted significant challenges.

The decision to use Heroku for backend deployment initially seemed feasible but ultimately proved problematic due to compatibility issues. Free alternatives either did not meet the requirements or had their own limitations. This situation led to a less-than-ideal solution where the backend needs to be run locally.

In hindsight, exploring deployment options more thoroughly during the planning phase might have mitigated some of these challenges. Additionally, having contingency plans for deployment issues would have been beneficial. Overall, the project was successful in terms of functionality but fell short in terms of deployment, which is a critical aspect of any web application. This experience highlighted the importance of thorough planning and flexibility in addressing unforeseen challenges.
