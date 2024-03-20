import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogCard from './BlogCard';
import { useNavigate } from 'react-router-dom';

const Blog = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/blogs');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();

  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const cardClicked = (blogData) => {
    navigate('/singleBlog/?postId=' + blogData.uploadId);
  };

  return (
    <div className='container mt-3'>
      <h1>Blog</h1>
      <div className="blog-list">
        {data.length === 0 ? (
          <div>
            <h1 className='text-danger mt-5 bg-light p-5'>No blogs found.</h1>
          </div>
        ) : (
          data.map((blog, i) => (
            <BlogCard key={i} blogData={blog} cardClicked={cardClicked} />
          ))
        )}
      </div>
    </div>
  );
};

export default Blog;
