import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import BlogCard from "./BlogCard";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


const MyBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const notify = useSelector(state => state.notify);
    const navigate = useNavigate();

    const getMyBlogs = async () => {
        try {
            if (localStorage.getItem("accessToken") && localStorage.getItem("myBlogAppAccessToken")) {
                const userId = localStorage.getItem("myBlogAppAccessToken");
                const accessToken = localStorage.getItem("accessToken");

                const { data } = await axios.get(`https://blogs-nodejs-api-production.up.railway.app/api/v1/blog/user-blog/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                if (data.success) {
                    setBlogs(data.blogs);
                } else {
                    navigate("/login")
                }
            } else {
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
            alert(error.response.data.message);
        }
    }
    useEffect(() => {
        getMyBlogs();
    }, [notify]);

    return <>
        <h1 style={{ textAlign: "center", marginTop: "60px" }}>My Blogs</h1>
        {
            blogs.length > 0 ? blogs.reverse().map((blog, id) => {
                return (
                    <BlogCard key={id} userId={blog.user._id} blogId={blog._id} username={blog.user.username} createdAt={blog.createdAt} title={blog.title} description={blog.description} image={blog.image} />
                )
            }) : <h1 style={{ textAlign: "center", margin: "auto" }} >No Blog Found , please create <Link to={"/create-blog"} >Create Blog</Link> </h1>
        }
    </>
}

export default MyBlogs;