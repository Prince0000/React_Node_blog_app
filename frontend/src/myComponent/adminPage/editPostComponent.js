import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EditPostComponent = () => {
    const { id } = useParams();
    const [postData, setPostData] = useState({});
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/blogs/${id}`);
                setPostData(response.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchPostData();
    }, [id]);

    const handleEdit = async (updatedData) => {
        setUpdating(true);
        try {
            await axios.put(`http://localhost:3001/api/upload/${updatedData._id}`, updatedData);
            setUpdating(false)
            alert("SuccessFully Edited")
        } catch (error) {
            setError(error);
        }
    };

    const handleFullDescriptionChange = (value) => {
        setPostData({ ...postData, fDesc: value });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="container mt-2">
            <h2>Edit Post</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleEdit(postData);
            }}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                        Title
                    </label>
                    <input type="text" className="form-control" id="title" value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} required={true} />
                </div>
                <div className="mb-3">
                    <label htmlFor="sdesc" className="form-label">
                        Small Description
                    </label>
                    <textarea className="form-control" id="sdesc" value={postData.sDesc} onChange={(e) => setPostData({ ...postData, sDesc: e.target.value })} required={true}></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="fdesc" className="form-label">
                        Full Description
                    </label>
                    <ReactQuill theme="snow" value={postData.fDesc} onChange={handleFullDescriptionChange} style={{ height: '200px' }} />
                </div>
                <div className="mb-3 mt-5">
                    <button type="submit" className="btn btn-primary" disabled={updating}>
                        {updating ? 'Uploading...' : 'Edit Post'}
                    </button>

                </div>
            </form>
        </div>
    );
}

export default EditPostComponent;
