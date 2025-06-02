import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthService from "../services/authService";

const LoginComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  const location = useLocation(); // 用來讀取 URL query string

  // 新增：用來讀取 URL 的 token
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    if (token) {
      AuthService.handleGoogleLogin(token);
      setCurrentUser(AuthService.getCurrentUser());
      // 清除 URL 的 token 參數，導向 profile 頁面
      navigate("/profile", { replace: true });
    }
  }, [location, navigate, setCurrentUser]);

  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [message, setMessage] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleLogin = async () => {
    try {
      let res = await AuthService.login(email, password);
      localStorage.setItem("user", JSON.stringify(res.data));
      window.alert("登入成功,將重新導向個人資料");
      setCurrentUser(AuthService.getCurrentUser());
      navigate("/profile");
    } catch (e) {
      setMessage(e.response.data);
    }
  };
  const handleGoogleLogin = () => {
    // 導向後端的 Google OAuth 登入路由
    window.location.href = "http://localhost:8080/api/auth/google";
  };

  return (
    <div style={{ padding: "3rem" }} className="col-md-12">
      <div>
        <div className="form-group">
          <button
            onClick={handleGoogleLogin}
            className="btn btn-dark btn-block"
          >
            {/* Google logo SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 533.5 544.3"
              style={{ width: 20, height: 20, marginRight: 10 }}
            >
              <path
                fill="#4285f4"
                d="M533.5 278.4c0-17.9-1.6-35.1-4.7-51.8H272v98h146.9c-6.3 34-25.3 62.8-54.3 82v68h87.8c51.4-47.4 81.1-117.2 81.1-196.2z"
              />
              <path
                fill="#34a853"
                d="M272 544.3c73.8 0 135.8-24.4 181-66.1l-87.8-68c-24.4 16.4-55.9 26-93.2 26-71.5 0-132-48.3-153.6-113.3H29.5v70.8C74.7 489 167.4 544.3 272 544.3z"
              />
              <path
                fill="#fbbc04"
                d="M118.4 324.9c-11.6-34.5-11.6-71.7 0-106.2v-70.8H29.5c-38.3 75.9-38.3 166.1 0 242l88.9-64.9z"
              />
              <path
                fill="#ea4335"
                d="M272 107.7c39.7 0 75.3 13.6 103.3 40.3l77.5-77.5C403.3 24.9 343 0 272 0 167.4 0 74.7 55.3 29.5 139.1l88.9 70.8C140 156 200.5 107.7 272 107.7z"
              />
            </svg>
            使用 Google 登入
          </button>
        </div>
        <br />
        {message && <div className="alert alert-danger">{message}</div>}
        <div className="form-group">
          <label htmlFor="username">電子信箱：</label>
          <input
            onChange={handleEmail}
            type="text"
            className="form-control"
            name="email"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">密碼：</label>
          <input
            onChange={handlePassword}
            type="password"
            className="form-control"
            name="password"
          />
        </div>
        <br />
        <div className="form-group">
          <button onClick={handleLogin} className="btn btn-primary btn-block">
            <span>登入系統</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
