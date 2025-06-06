這是一個簡單的部落格系統，提供使用者發文、編輯、刪除與瀏覽功能。

## 目前功能

- 使用者可新增、編輯、刪除文章
- 使用者註冊、登入、登出
- Oauth 登入
- 使用 JWT 實作身分驗證
- RESTful API 設計
- 使用者與文章資料 Join 關聯

## 技術使用

- **前端**：React、Bootstrap 5
- **後端**：Node.js、Express.js
- **資料庫**：MongoDB（使用 Mongoose ODM）
- **驗證機制**：
  - JWT（API 驗證）
  - Passport.js（支援 OAuth）JWT 驗證
- **資料關聯**：文章與使用者透過 Mongoose 建立 Join 關聯

## 🔐 JWT 驗證流程
- 採用預設HMAC SHA
- 使用者登入成功後，伺服器回傳 JWT
- 前端（React）儲存該 Token（可使用 localStorage)
- 所有受保護 API 請求需附帶該 Token
- 後端會驗證 Token 是否有效，才允許存取

## 畫面
![image](https://github.com/user-attachments/assets/6f45e51a-3654-4f9b-862a-687ebdff7d33)
![image](https://github.com/user-attachments/assets/cf4b3088-a00e-48e1-84a6-cfa2349983da)
![image](https://github.com/user-attachments/assets/ce2965c8-5707-48a2-98e0-5573e8dab3fc)

![image](https://github.com/user-attachments/assets/041e47c6-dba8-451a-8df1-2fa413568c3c)
![image](https://github.com/user-attachments/assets/bc038090-1274-43af-9bd5-6902109c069e)
![image](https://github.com/user-attachments/assets/d3f7f903-8a83-4165-a181-d314d9776f17)




## 以下是安裝指令
