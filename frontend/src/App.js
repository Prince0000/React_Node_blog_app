import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import HomePage from './myComponent/HomePage';
import Blog from './myComponent/Blog';
import SingleBlog from './myComponent/SingleBlog';
import Login from './myComponent/Login';
import Signup from './myComponent/Signup';
import Dashboard from './myComponent/adminPage/Dashboard';
import AdminLogin from './myComponent/adminPage/AdminLogin';
import CreatePost from './myComponent/adminPage/CreatePost';
import YourPost from './myComponent/adminPage/YourPost';
import EditPostComponent from './myComponent/adminPage/editPostComponent';

function NotFound() {
  return <h1>404 - Not Found</h1>;
}

function App() {
  const [isLogin, setIsLogin] = useState(false);

  const Logout = () => {
    localStorage.removeItem('BlogPostUser');
    setIsLogin(false);
  };

  useEffect(() => {
    const userData = localStorage.getItem('BlogPostUser');
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      if (parsedUserData && parsedUserData.isLogin) {
        setIsLogin(parsedUserData.isLogin);
      }
    }
  }, [isLogin]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage Logout={Logout} />}>
          <Route index element={<Blog />} />
          <Route path="login" element={<Login setIsLogin={setIsLogin} />} />
          <Route path="signup" element={<Signup />} />
          <Route path="singleBlog" element={<SingleBlog />} />
        </Route>

        <Route path="/admin" element={<Dashboard />}>
          <Route path="login" element={<AdminLogin />} />
          <Route path="create-post" element={<CreatePost />} />
          <Route path="edit-post/:id" element={<EditPostComponent />} />
          <Route path="yourPost" element={<YourPost />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
