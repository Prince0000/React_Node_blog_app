// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import routes
const blogsRouter = require('./routes/Blogs');
const uploadBlogRouter = require('./routes/UploadBlog');
const uploadBlogLokeRouter = require('./routes/LikeUpdate');
const SignupRouter = require('./routes/UserSignUp');
const LoginRouter = require('./routes/UserLogin');
const DeleteRouter = require('./routes/BlogDelete');
const AdminLoginRouter = require('./routes/AdminLogin');

// Create an Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.static('public'));

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/blog', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Error connecting to MongoDB:", err));

// Define routes
app.use('/api/blogs', blogsRouter);
app.use('/api/upload', uploadBlogRouter);
app.use('/api/likeUpdate', uploadBlogLokeRouter);
app.use('/api/signup', SignupRouter);
app.use('/api/login', LoginRouter);
app.use('/api/deleteBlog', DeleteRouter);
app.use('/api/adminLogin', AdminLoginRouter);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
