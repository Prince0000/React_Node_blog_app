import React, { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('BlogPostUser')) {
      navigate('/');
    }
    if (!localStorage.getItem('AdminLoginBlog')) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const adminLogout = () => {
    localStorage.removeItem('AdminLoginBlog');
    navigate('/admin/login');
  };

  const data = JSON.parse(localStorage.getItem('AdminLoginBlog'));
  return (
    <>
      {localStorage.getItem('AdminLoginBlog') && (
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-5">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/admin/yourPost">Admin Panel ID : {data._id}</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item ">
                  <Link className="nav-link active" aria-current="page" to="/admin/yourPost">Dashboard</Link>
                </li>

                <li className="nav-item ">
                  <Link className="nav-link active" aria-current="page" to="/admin/create-post">Create Post</Link>
                </li>

                <li className="nav-item ">
                  <button className="nav-link active" onClick={adminLogout}>Logout</button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )}
      <Outlet />
    </>
  );
};

export default Dashboard;
