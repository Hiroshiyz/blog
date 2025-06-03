# Blog

一個簡單的部落格系統，提供使用者發文、編輯、刪除與瀏覽功能。

## 🔧 功能特色

- 使用者可新增、編輯、刪除文章
- 使用者註冊、登入、登出 (尚未更新更改密碼忘記密碼功能)
- 使用 JWT 實作身分驗證
- RESTful API 設計
- 使用者與文章資料 Join 關聯
- 介面使用 Bootstrap + React 開發

## 🛠 技術棧

- **前端**：React、Bootstrap 5
- **後端**：Node.js、Express.js
- **資料庫**：MongoDB（使用 Mongoose ODM）
- **驗證機制**：
  - JWT（API 驗證）
  - Passport.js（支援 OAuth）JWT驗證
- **資料關聯**：文章與使用者透過 Mongoose 建立 Join 關聯

## 🔐 JWT 驗證流程

- 使用者登入成功後，伺服器回傳 JWT
- 前端（React）儲存該 Token（可使用 localStorage 或 cookie）
- 所有受保護 API 請求需附帶該 Token
- 後端會驗證 Token 是否有效，才允許存取






