import React, { useEffect, useState } from 'react'
import Card from './Card'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const YourPost = () => {
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

    const DeletePost = async (id) => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm("Are you sure you want to proceed with the deletion?")) {
            try {
                await axios.delete(`http://localhost:3001/api/deleteBlog/${id}`);
                setData(data.filter(blog => blog._id !== id));
            } catch (error) {
                setError(error.message);
            }
        } else {
            // Handle cancel action if needed
        }
    }

    const EditPost = async (id) => {
        navigate(`/admin/edit-post/${id}`);
    };


    return (
        <div className='container my-3'>
            <h3 className='text-center p-2 '>All Posts</h3>
            <hr />
            <div className='row  d-flex justify-content-center '>

                {data.length === 0 ? (
                    <div>
                        <h1 className='text-danger mt-5 bg-light p-5'>No blogs found.</h1>
                    </div>
                ) : (
                    data.map((blog, i) => (
                        <Card key={i} blogData={blog} DeletePost={DeletePost} EditPost={EditPost} />
                    ))

                )}
            </div>
        </div>


    )
}

export default YourPost
