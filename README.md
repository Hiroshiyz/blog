這是一個簡單的部落格系統，提供使用者發文、編輯、刪除與瀏覽功能。

這是一個具備會員系統與文章管理功能的全端部落格平台，支援JWT 驗證機制與 OAuth 登入，採用 RESTful 架構設計，前後端分離開發。適合展示我在 API 設計、身分驗證、資料關聯設計與全端整合方面的實作經驗。

🔗 GitHub Repo: https://github.com/Hiroshiyz/blog

✅ 專案功能簡介
✏️ 使用者可進行新增、編輯、刪除、瀏覽文章

🔐 支援註冊、登入、登出與第三方登入（OAuth）

🔄 採用 JWT 實作 API 驗證機制（Token 儲存在 localStorage）

👥 使用者與文章資料具備關聯性（Join 關聯查詢）

📡 後端提供RESTful API，前端以 React 串接資料

⚙️ 技術架構與工具使用
前端技術（Client）
React.js：前端框架，負責 UI 邏輯與頁面切換（React Router）

Bootstrap 5：實作 RWD 響應式網頁與介面元件

Axios：與後端進行 API 資料交換

localStorage：儲存 JWT Token，進行登入狀態判斷

後端技術（Server）
Node.js + Express.js：建構後端伺服器與 RESTful API

Mongoose：ODM 工具，定義 MongoDB 資料結構與進行 CRUD 操作

MongoDB Atlas：雲端資料庫，儲存使用者與文章資料

CORS / Middleware：實作跨來源請求與權限保護邏輯

驗證與安全（Authentication）
JWT（JSON Web Token）：

用於登入後回傳 token

前端儲存於 localStorage，後端中介層驗證 token 有效性

Passport.js + OAuth 2.0：

實作 Google 第三方登入機制

Token 綁定與使用者資料同步

資料關聯設計（Database Schema）
使用者（User）與文章（Post）透過 userId 建立一對多關係

查詢時使用 Mongoose .populate() 建立 Join 效果

📐 架構設計亮點
🔄 RESTful API 規劃清楚：採用 GET / POST / PUT / DELETE 實現文章與使用者功能

🧱 模組化設計：前後端程式碼結構清晰，方便後續擴充與維護

🛡️ 登入保護機制完善：限制未登入者存取受保護 API

♻️ 支援重新整理不掉登入狀態：JWT 長效驗證機制搭配前端 token 管理

🖼️ 實際畫面截圖




![image](https://github.com/user-attachments/assets/041e47c6-dba8-451a-8df1-2fa413568c3c)
![image](https://github.com/user-attachments/assets/bc038090-1274-43af-9bd5-6902109c069e)
![image](https://github.com/user-attachments/assets/d3f7f903-8a83-4165-a181-d314d9776f17)




## 以下是安裝指令
 安裝步驟

Clone 專案

```bash
git clone https://github.com/your-username/blog-system.git
cd blog-system
```

安裝下載套件
```bash

npm install
```
建立環境變數
```bash
請在根目錄下建立 .env 檔案，並加入以下內容（根據你的實際設定調整）：
PASSPORT_SECRET = 
GOOGLE_CLIENT_ID =
GOOGLE_CLIENT_SECRET = 
```
