import React from "react";
import { Link } from "react-router-dom";
const HomeComponent = () => {
  return (
    <main>
      <div className="container py-4">
        <div className="p-5 mb-4 bg-light rounded-3">
          <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold">社群系統</h1>
            <p className="col-md-8 fs-4">
              本系統使用bootsrap套件， React.js 作為前端框架，Node.js、MongoDB
              作為後端服務器。擁有發佈、編輯貼文，以及會員系統的功能模擬市面上社群網站的設計
            </p>
          </div>
        </div>

        <div className="row align-items-md-stretch">
          <div className="col-md-6">
            <div className="h-100 p-5 text-white bg-dark rounded-3">
              <h2>訪客</h2>
              <p>本網站僅供練習模擬網站，不提供訪客功能，請先註冊會員</p>
              <button className="btn btn-outline-light" type="button">
                <Link className="nav-link" to="/register">
                  註冊會員
                </Link>
              </button>
            </div>
          </div>
          <div className="col-md-6">
            <div className="h-100 p-5 bg-light border rounded-3">
              <h2>已經是會員</h2>
              <p>本網站僅供練習模擬網站，切勿將個人信用卡等私密資訊上傳至此</p>
              <button className="btn btn-outline-secondary" type="button">
                <Link className="nav-link" to="/login">
                  會員登入
                </Link>
              </button>
            </div>
          </div>
        </div>

        <footer className="pt-3 mt-4 text-muted border-top">
          &copy; 2025 hiroshisan
        </footer>
      </div>
    </main>
  );
};

export default HomeComponent;
