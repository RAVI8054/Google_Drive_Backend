
---

## 📁 Backend – `backend/README.md`

# Google Drive Clone - Backend (Node.js + Express + MongoDB)

This is the **backend** of the Google Drive Clone project, built with **Node.js, Express, and MongoDB**.  
It handles authentication (JWT), folders, and image metadata (URLs stored in MongoDB, files on Cloudinary).

---

## 🚀 Tech Stack
- Node.js
- Express
- MongoDB (Mongoose)
- JWT Authentication
- Cloudinary (via frontend uploads)

---

## ⚙️ Environment Variables

Create a `.env` file in the **root of backend project**:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

```
## 🛠️Installation
### Clone repo
```
git clone https://github.com/your-username/Google_Drive_Clone_Backend.git
cd Google_Drive_Clone_Backed

```

### Install dependencies
```
npm install
```

### Run in development
```
npm run dev
```


