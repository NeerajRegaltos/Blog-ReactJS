import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getNotified } from "../redux/authSlice";

const DeleteIcon = ({ blogId }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleDelete = async () => {
        try {
            if (localStorage.getItem("accessToken")) {


                const accessToken = localStorage.getItem("accessToken");
                const x = window.confirm("Are you sure , you want to delete ?");
                if (x) {
                    const { data } = await axios.delete(`https://blogs-nodejs-api-production.up.railway.app/api/v1/blog/delete-blog/${blogId}`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    });

                    if (data.success) {
                        dispatch(getNotified(`deleted${blogId}`));
                        navigate(window.location.pathname)
                    } else {
                        navigate("/login");
                    }
                }
            } else {
                navigate("/login");
            }

        } catch (error) {
            console.log(error);
            alert(error.response.data.message);
        }
    }


    return <>
        <img onClick={handleDelete} src="https://cdn-icons-png.flaticon.com/512/3439/3439691.png" alt="delete-button" width={20} height={20} style={{ marginLeft: "20px", cursor: "pointer" }} />
    </>
}

export default DeleteIcon;