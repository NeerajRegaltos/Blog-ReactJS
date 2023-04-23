import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


const CreateBlog = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        image: ""
    });

    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        if (location.state) {
            const l = location.state;
            setInput({
                title: l.title,
                description: l.description,
                image: l.image
            })
        } else {
            setInput({
                title: "",
                description: "",
                image: ""
            })
        }
    }, [location])

    const createBlog = async (payload) => {
        try {
            if (localStorage.getItem("myBlogAppAccessToken") && localStorage.getItem("accessToken")) {
                const userId = localStorage.getItem("myBlogAppAccessToken");
                const accessToken = localStorage.getItem("accessToken");
                const { data } = await axios.post(`https://blogs-nodejs-api-production.up.railway.app/api/v1/blog/create-blog/${userId}`, payload, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                if (data.success) {
                    navigate("/my-blogs")
                    setInput({
                        title: "",
                        description: "",
                        image: ""
                    })
                } else {
                    navigate("/login");
                }
            } else {
                navigate("/login");
            }

        } catch (error) {
            console.log(error)
            alert(error.response.data.message)
        }
    }

    const editBlog = async (payload) => {
        try {
            if (localStorage.getItem("accessToken")) {
                const accessToken = localStorage.getItem("accessToken");
                const { data } = await axios.put(`https://blogs-nodejs-api-production.up.railway.app/api/v1/blog/update-blog/${location.state.blogId}`, payload, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })

                if (data.success) {
                    navigate("/my-blogs");
                } else {
                    navigate("/login");
                }
            } else {
                navigate("/login");
            }


        } catch (error) {
            console.log(error);
            alert(error.response.data.message)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (location.state === null)
            createBlog(input);
        else
            editBlog(input);
    }

    const handleChange = (e) => {

        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    return <>
        <div className="card mx-auto p-5" style={{ width: '40rem', marginTop: "150px" }}>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Title</label>
                    <input type="text" onChange={handleChange} name="title" className="form-control" value={input.title} maxLength="25" id="exampleFormControlInput1" placeholder="Title" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Picture URL</label>
                    <input type="text" onChange={handleChange} className="form-control" name="image" value={input.image} id="exampleFormControlInput2" placeholder="https://image/indiagate.jpg" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlTextarea1">Description <span style={{ fontSize: "10px", color: "red" }}>160 Chars allowed only.</span></label>
                    <textarea className="form-control" onChange={handleChange} name="description" value={input.description} id="exampleFormControlTextarea1" maxLength="160" rows={3} style={{ resize: "none" }} />
                </div>

                <button type="submit" className="btn btn-primary">{location.state === null ? "Create Blog" : "Edit Blog"}</button>
            </form>

        </div>
    </>
}

export default CreateBlog;