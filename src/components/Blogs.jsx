import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import BlogCard from "./BlogCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const notify = useSelector(state => state.notify);
    const navigate = useNavigate();

    const getBlogs = async () => {
        try {
            if (localStorage.getItem("accessToken")) {

                const accessToken = localStorage.getItem("accessToken");
                const { data } = await axios.get(`https://blogs-nodejs-api-production.up.railway.app/api/v1/blog/all-blogs`, {
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
                navigate("/login")
            }
        } catch (error) {
            console.log(error);
            alert(error.response?.data.message)
        }
    }

    useEffect(() => {
        getBlogs();
    }, [notify])

    return <>
        {
            blogs.reverse().map((blog, id) => {
                return (
                    <BlogCard key={id} userId={blog.user._id} username={blog.user.username} blogId={blog._id} createdAt={blog.createdAt} title={blog.title} description={blog.description} image={blog.image} />
                )
            })
        }
    </>
}

export default Blogs;