# Admin Login Details

To access the admin panel of the blog, please follow these instructions:

## Admin Credentials

- **ID:** The admin ID is stored inside the `blog.admindatas` file.
- **Password:** The password for the admin login is `admin`.

## Import Admin Data

Before logging in as an admin, make sure to import the admin data into your database. 

1. Open your MongoDB client or MongoDB Compass.
2. Import the `blog.admindatas` file into your database:
   ```bash
   mongoimport --db your_database_name --collection admin_data --file path/to/blog.admindatas.json --jsonArray


# My Blog Project

Welcome to my Blog project! This is a full-stack application built with React.js, Node.js, Express.js, and MongoDB. This project allows users to create, read, update, and delete blog posts.

## Technologies Used

- **Frontend:**
  - React.js: A JavaScript library for building user interfaces.
  - React Router: Declarative routing for React applications.
  - Bootstrap: Front-end framework for responsive and mobile-first design.
  - Axios: Promise-based HTTP client for making requests to the server.
  
- **Backend:**
  - Node.js: JavaScript runtime environment that executes JavaScript code server-side.
  - Express.js: Web application framework for Node.js for building APIs and web servers.
  - MongoDB: NoSQL database for storing blog post data.
  - Mongoose: MongoDB object modeling for Node.js.
  
## Features

- **Authentication:** User authentication and authorization.
- **CRUD Operations:** Create, Read, Update, and Delete blog posts.
- **Responsive Design:** Mobile-friendly UI using Bootstrap.
- **RESTful API:** Backend API for interacting with blog post data.
- **Database Management:** MongoDB for storing and managing blog post data.

# Blog Project Setup Instructions

To get started with the Blog Project on your local machine, follow these steps:

1. **Clone the repository:**
   ```
   git clone https://github.com/Prince0000/React_Node_blog_app.git
   ```

2. **Navigate to the project directory:**
   ```
   cd blog-project
   ```

3. **Navigate to the frontend and backend directories:**
   ```
   cd backend
   cd frontend
   ```

4. **Install Important Frameworks and Libraries:**
    - **For Backend:**
        ```
        cd backend
        npm install
        ```

    - **For Frontend:**
        ```
        cd frontend
        npm install
        ```

5. **Run the Project:**

   - **Backend:**
     ```
     nodemon index.js
     ```

   - **Frontend:**
     ```
     npm start
     ```

