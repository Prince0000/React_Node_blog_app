import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import UserAvatar from './UserAvatar'; 

const HomePage = ({ Logout }) => {
    const user = JSON.parse(localStorage.getItem("BlogPostUser"));
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-5">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Assignment Blog</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item ">
                                <Link className="nav-link active " aria-current="page" to="/">Home</Link>
                            </li>

                            <li className="nav-item">
                                {user && user.isLogin ? <Link className="nav-link" to="/" onClick={Logout}>Logout</Link> : <Link className="nav-link" to="/login">Login</Link>}
                            </li>
                            <li className="nav-item">
                                {user && user.isLogin ? null : <Link className="nav-link" to="/admin/login">Admin </Link>}
                            </li>
                            {user && user.isLogin ?
                            <li className="nav-item" title={user.name} style={{ cursor: 'pointer' }}>
                                 <UserAvatar name={user.name} /> 
                            </li>
                            : null}
                        </ul>
                    </div>
                </div>
            </nav>

            <Outlet></Outlet>
        </>
    )
}

export default HomePage;
