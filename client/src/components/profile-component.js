import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/authService";
const ProfileComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  //點選個人檔案渲染1次
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

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
        </div>
      )}
    </div>
  );
};

export default ProfileComponent;
