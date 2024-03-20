import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertStyle, setAlertStyle] = useState("alert alert-danger mt-3");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:3001/api/signup', { name, email, password });
            setLoading(false);
            setAlertMessage('Account created successfully!');
            navigate('/login')
            setAlertStyle("alert alert-success mt-3");
            setName('');
            setEmail('');
            setPassword('');
        } catch (error) {
            setLoading(false);
            if (error.response) {
                const statusCode = error.response.status;
                setAlertStyle("alert alert-danger mt-3")
                switch (statusCode) {
                    case 400:
                        setAlertMessage('Account already exists.');
                        break;
                    default:
                        setAlertMessage('An error occurred. Please try again later.');
                }
            } else {
                setAlertMessage('An error occurred. Please try again later.');
            }
        }
    }

    return (
        <div className='container-fluid bg-light d-flex justify-content-center' style={{ minHeight: '92vh' }}>
            <div className="card w-50 h-100 mt-5">
                <div className="card-body d-flex justify-content-center flex-column">
                    <form onSubmit={handleSignup}>
                        <h1>Create New Account</h1>
                        <div className="mb-3">
                            <label htmlFor="Uname" className="form-label">Name</label>
                            <input type="text" className="form-control" id="Uname"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                required={true}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email"
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
                            <button type="submit" className="btn btn-danger" disabled={loading}>
                                {loading ? 'Creating Account...' : 'Create Account'}
                            </button>
                            <Link className="nav-link" to="/login">Go Back To Login</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup;
