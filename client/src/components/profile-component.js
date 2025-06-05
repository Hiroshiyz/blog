import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/authService";
import PostService from "../services/PostService";

const ProfileComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  const [postData, setPostData] = useState([]);
  const handleEdit = (postId) => {
    navigate(`/editPost/${postId}`);
  };
  //點選個人檔案渲染1次
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    console.log("token from url:", token);
    if (token) {
      AuthService.setUser(token);
      setCurrentUser(AuthService.getCurrentUser());
      window.history.replaceState({}, document.title, "/profile");
    } else {
      const user = AuthService.getCurrentUser();
      if (user) {
        setCurrentUser(user);
      } else {
        navigate("/login");
      }
    }
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
  }, [setCurrentUser, navigate]);
  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && <div>在獲取您的個人資料之前，您必須先登錄。</div>}
      {currentUser && (
        <div>
          <h2>以下是您的個人檔案：</h2>

          <table className="table">
            <tbody>
              <tr>
                <td>
                  <strong>姓名：{currentUser.user.name}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>您的用戶ID: {currentUser.user._id}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>您註冊的電子信箱: {currentUser.user.email}</strong>
                </td>
              </tr>
            </tbody>
          </table>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {postData.map((post) => {
              return (
                <div
                  className="card"
                  style={{ width: "18rem", margin: "1rem" }}
                >
                  <div className="card-body">
                    <h5 className="card-title">
                      {" "}
                      <strong>{post.title}</strong>
                    </h5>

                    <p style={{ margin: "0.5rem" }} className="card-text">
                      <strong>內容: </strong>
                      <br /> {post.description}
                    </p>
                    <p className="card-text" style={{ margin: "0.5rem" }}>
                      <strong>作者: </strong> {post.author.name}
                    </p>

                    <button
                      className="btn btn-primary btn-block"
                      onClick={() => handleEdit(post._id)}
                    >
                      編輯貼文
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileComponent;
