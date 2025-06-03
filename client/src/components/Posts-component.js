import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PostService from "../services/PostService";
const PostsComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  const handleTakeLogin = () => {
    navigate("/login");
  };
  const [postData, setPostData] = useState(null);
  useEffect(() => {
    if (currentUser) {
      PostService.getAll()
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
          <p>你必須先登入才能看到貼文</p>
          <button className="btn btn-primary btn-lg" onClick={handleTakeLogin}>
            回到登入頁面
          </button>
        </div>
      )}
      {currentUser && postData && postData.length != 0 && (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {postData.map((post) => {
            return (
              <div className="card" style={{ width: "18rem", margin: "1rem" }}>
                <div className="card-body">
                  <h5 className="card-title">
                    {" "}
                    <strong>標題: </strong>
                    {post.title}
                  </h5>

                  <p style={{ margin: "0.5rem" }} className="card-text">
                    <strong>內容:</strong>
                    <br /> {post.description}
                  </p>
                  <p style={{ margin: "0.5rem" }} className="card-text">
                    <strong>作者:</strong> {post.author.name}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PostsComponent;
