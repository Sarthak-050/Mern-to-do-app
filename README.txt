STEP-BY-STEP:

1. Upload this zip to GitHub with folder structure:
   /client -> frontend
   /server -> backend

2. Deploy backend using Render:
   - Use root directory: /server
   - Set build: npm install
   - Set start: node index.js
   - Add env var: MONGO_URI

3. Frontend Axios should point to your backend URL:
   axios.defaults.baseURL = "https://your-backend-link.onrender.com";

4. Test everything at https://sarthak-todo.vercel.app
