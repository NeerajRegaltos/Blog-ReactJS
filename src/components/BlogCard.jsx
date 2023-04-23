import DeleteIcon from "./DeleteIcon";
import EditIcon from "./EditIcon";


const BlogCard = (props) => {

    const dateFormat = (date) => {
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        let d = new Date(date);
        const dt = d.getDate();
        const month = monthNames[d.getMonth()];
        const year = d.getFullYear();

        return `${month}  ${dt} , ${year}`
    }

    return <>

        <div className="card mb-3" style={{ width: '32rem', height: "47rem", margin: "auto", marginTop: "80px" }}>
            <div style={{ display: "flex" }}>
                <h5 style={{ borderRadius: "50%", backgroundColor: "pink", width: "35px", marginLeft: "10px", marginTop: "10px", textAlign: "center", padding: "5px" }}>{props.username[0]}</h5>
                <p className="card-name mx-2 mt-2 ml-3">{props.username}</p>
            </div>

            <p className="mr-5" style={{ fontSize: "12px", textAlign: "end" }}>{dateFormat(props.createdAt)}</p>
            <h5 className="card-title ml-4">{props.title}</h5>
            {props.userId && localStorage.getItem("myBlogAppAccessToken") && props.userId === localStorage.getItem("myBlogAppAccessToken") ?
                <div style={{ display: "flex", marginLeft: "420px", marginBottom: "10px" }} >
                    <EditIcon blogId={props.blogId} userId={props.userId} description={props.description} title={props.title} image={props.image} />
                    <DeleteIcon blogId={props.blogId} userId={props.userId} />
                </div>
                : ""
            }

            <div className="card-body">
                <img
                    className="card-img-top"
                    style={{ width: '29rem', height: "30rem" }}
                    src={props.image}
                    alt="Card image cap"
                />
                <p className="card-text mt-2">{props.description}</p>
            </div>
        </div>


    </>
}

export default BlogCard;