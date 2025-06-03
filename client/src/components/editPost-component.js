import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostService from "../services/PostService";
import { useParams } from "react-router-dom";
const EditPostComponent = (props) => {
  let { currentUser, setCurrentUser } = props;
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [postData, setPostData] = useState([]);
  const { id: postId } = useParams();
  const handleTakeToLogin = () => {
    navigate("/login");
  };
  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleChangeDesciption = (e) => {
    setDescription(e.target.value);
  };

  const editPost = () => {
    PostService.edit(title, description, postId)
      .then(() => {
        window.alert("已編輯貼文");
        navigate("/profile");
      })
      .catch((error) => {
        console.log(error.response);
        setMessage(error.response.data);
      });
  };
  useEffect(() => {
    if (currentUser) {
      PostService.get(currentUser.user._id)
        .then((res) => {
          console.log(res.data);
          setPostData(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, []);

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <p>在編輯新貼文之前，您必須先登錄。</p>
          <button
            className="btn btn-primary btn-lg"
            onClick={handleTakeToLogin}
          >
            帶我進入登錄頁面。
          </button>
        </div>
      )}
      {currentUser && (
        <div className="form-group">
          <label for="exampleforTitle">貼文標題：</label>
          <input
            name="title"
            type="text"
            className="form-control"
            id="exampleforTitle"
            onChange={handleChangeTitle}
          />
          <br />
          <label for="exampleforContent">內容：</label>
          <textarea
            className="form-control"
            id="exampleforContent"
            aria-describedby="emailHelp"
            name="content"
            onChange={handleChangeDesciption}
          />
          <br />
          <button className="btn btn-primary" onClick={editPost}>
            編輯貼文
          </button>

          <br />
          <br />
          <br />

          {message && (
            <div className="alert alert-warning" role="alert">
              {message}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EditPostComponent;
