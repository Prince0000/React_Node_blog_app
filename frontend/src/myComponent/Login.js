import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ setIsLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertStyle, setAlertStyle] = useState("alert alert-danger mt-3");
    const navigate = useNavigate();

    if (localStorage.getItem('BlogPostUser')) {
        navigate('/')
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:3001/api/login', { email, password });
            setLoading(false);
            console.log(response)
            if (response.status === 200) {
                localStorage.setItem('BlogPostUser', JSON.stringify({ ...response.data, isLogin: true }));
                setIsLogin(true);
                localStorage.removeItem('AdminLoginBlog')
                navigate('/');
            } else {
                setIsLogin(false);
                setAlertMessage('Invalid email or password.');
                setAlertStyle("alert alert-danger mt-3");
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
            if (error.response) {
                // Server responded with an error status
                if (error.response.status === 404) {
                    setAlertMessage('Invalid email or password.');
                } else {
                    setAlertMessage(error.response.data.message || 'An error occurred.');
                }
            } else if (error.request) {
                // Request made but no response received
                setAlertMessage('No response received from server. Please try again later.');
            } else {
                // Something else went wrong
                setAlertMessage('An error occurred. Please try again later.');
            }
            setAlertStyle("alert alert-danger mt-3");
        }
    };


    return (
        <div className='container-fluid bg-light d-flex justify-content-center' style={{ minHeight: '92vh' }}>
            <div className="card w-50 h-100 mt-5">
                <div className="card-body d-flex justify-content-center flex-column">
                    <form onSubmit={handleLogin}>
                        <h1>Login Form</h1>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" aria-describedby="emailHelp"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required={true}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="pass" className="form-label">Password</label>
                            <input type="password" className="form-control" id="pass"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required={true}
                            />
                        </div>
                        <div>
                            {alertMessage && <div className={alertStyle} role="alert">{alertMessage}</div>}
                        </div>

                        <div className='d-flex justify-content-between mt-4'>
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? 'Logging in...' : 'Login'}
                            </button>
                            <Link className="nav-link" to="/signup">Create New Account</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default Login;
