import { useForm } from "react-hook-form";
import "./AddComment.scss"

const AddComment = ({closePanel}) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        const postData = JSON.stringify(data)
          const requestOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: postData
          };
          fetch('https://62cbcfcd8042b16aa7c2d987.mockapi.io/blog/api/comments', requestOptions)
              .then(response => response.json())
              .then(ret_data => {console.log("returnData", ret_data); onClose()});
    };

    const onClose = e => {
        closePanel()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="add_com_top_layer">
                <h2 className="add_com_title">Add Comment</h2>
                <button className="add_com_button" onClick={onClose}>X</button>
            </div>
            
            <div className="add_com_dash_lines">
                <div className="add_com_dash_one"></div>
                <div className="add_com_dash_two"></div>
            </div>
            <div className="add_com_input">
                <input className="add_com_name" {...register("name")} placeholder="Your Name" />
                <input className="add_com_email" {...register("email")} placeholder="Your Email" />
            </div>
            <div className="add_com_bottom_layer">
                <textarea className="add_com_content" {...register("content")} placeholder="Your Message" />
                <input className="add_com_submit" type="submit" />
            </div>
            
        </form>
      );
}

export default AddComment