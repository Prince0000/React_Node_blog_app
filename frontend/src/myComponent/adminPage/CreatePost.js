import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [sDesc, setSDesc] = useState('');
    const [fullDescription, setFullDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [errorColor, setErrorColor] = useState('alert alert-danger');
    const [file, setFile] = useState(null);
    const [uploadId, setUploadId] = useState('');
    const userData = JSON.parse(localStorage.getItem('AdminLoginBlog'));

    useEffect(() => {
        if (userData) {
            setUploadId(`${Date.now()}_${userData._id}_Blog`);
        }
    }, [userData]);

    const handleFullDescriptionChange = (value) => {
        setFullDescription(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);
        formData.append('sDesc', sDesc);
        formData.append('fullDescription', fullDescription);
        formData.append('UserId', userData._id);
        formData.append('uploadId', uploadId);

        try {
            const res = await axios.post('http://localhost:3001/api/upload', formData);
            alert("Post Uploaded Successfully");
            setErrorColor('alert alert-success');
            // console.log(res);
            setError(res.data.message);
            setIsLoading(false);
            setTitle('');
            setSDesc('');
            setFullDescription('');
            setFile(null);
        } catch (err) {
            setErrorColor('alert alert-danger');
            setError(err.response.data.message || 'An error occurred during upload.');
            setIsLoading(false);
        }
    };

    return (
        <div className="container mt-2">
            <h2>Create New Post</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                        Title
                    </label>
                    <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required={true}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="sdesc" className="form-label">
                        Small Description
                    </label>
                    <textarea className="form-control" id="sdesc" value={sDesc} onChange={(e) => setSDesc(e.target.value)} required={true}></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="fdesc" className="form-label">
                        Full Description
                    </label>
                    <ReactQuill theme="snow" value={fullDescription} onChange={handleFullDescriptionChange} style={{ height: '200px' }} />
                </div>
                <div className="mb-3 mt-5">
                    <label htmlFor="image" className="form-label">
                        Image
                    </label>
                    <input type="file" className="form-control" id="image" onChange={e => setFile(e.target.files[0])} required={true} accept='image/*'/>
                </div>

                {error && <div className={errorColor}>{error}</div>}

                <div className="mb-3">
                    <button type="submit" className="btn btn-primary" disabled={isLoading}>
                        {isLoading ? 'Uploading...' : 'Upload Post'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreatePost;
