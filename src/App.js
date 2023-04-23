import './App.css';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Blogs from './components/Blogs';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import MyBlogs from './components/MyBlogs';
import CreateBlog from './components/CreateBlog';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './redux/authSlice';



function App() {
  const dispatch = useDispatch();

  if (localStorage.getItem("accessToken")) {
    dispatch(login(true));
  } else {
    dispatch(login(false));
  }
  const isLogin = useSelector(state => state.isLogin);
  return (
    <div>
      <Header />
      <Routes >
        <Route path='/' element={<Home />} />
        {isLogin && <>
          <Route path="/all-blogs" element={<Blogs />} />
          <Route path="/my-blogs" element={<MyBlogs />} />
          <Route path="/create-blog" element={<CreateBlog />} />
        </>}

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
