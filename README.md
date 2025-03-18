   # ChatStream - Real-time Chat Application✨

ChatStream is a cutting-edge real-time chat application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) and powered by Socket.IO for seamless, instant communication. Designed for efficiency and scalability, ChatStream delivers a smooth and engaging user experience, making real-time conversations more interactive and responsive.
## Laptop Version
![ChatStream Screenshot](https://github.com/Rohit201Bh/Full-Stack-ChatStream/blob/08be81643d471d8fc681aa977c49bb19b463da5b/Img%201.png)

## Features

- 🔐 Authentication (Signup/Login)
- 👤 Profile Management with Avatar Upload
- 💬 Real-time Messaging
- 🌅 Image Sharing in Chats
- 🎨 Multiple Theme Options
- 📱 Responsive Design
- 🟢 Online Status Indicators
- 🔴 New Message Status Indicators
- 📬 Unread Message Indicators
- 💫 Message Read Receipts

## Mobile Version (Which shows Responsive)
![ChatStream Screenshot](https://github.com/Rohit201Bh/Full-Stack-ChatStream/blob/08be81643d471d8fc681aa977c49bb19b463da5b/WhatsApp%20Image%202025-03-18%20at%201.18.36%20PM.jpeg)

### Frontend
- React.js with Vite
- TailwindCSS & DaisyUI for styling
- Zustand for state management
- Socket.IO Client for real-time features
- React Router for navigation
- Axios for API requests

### Backend
- Node.js & Express.js
- MongoDB & Mongoose
- Socket.IO for real-time communication
- JWT for authentication
- Cloudinary for image storage
- Bcrypt for password hashing

## Getting Started

1. Install dependencies:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up environment variables:

Create a `.env` file in the backend directory:
```env
MONGODB_URI=your_mongodb_uri
PORT=5001
JWT_SECRET=your_jwt_secret
NODE_ENV=development
CLOUDINARY_CLOUD_NAME=your_cloud_name
```

4. Run the application:

```bash
# Run backend (from backend directory)
npm run dev

# Run frontend (from frontend directory)
npm run dev
```

## Project Structure

```
chat-app/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── lib/
│   │   └── App.jsx
│   └── package.json
└── backend/
    ├── src/
    │   ├── controllers/
    │   ├── models/
    │   ├── routes/
    │   ├── middlewares/
    │   ├── lib/
    │   └── index.js
    └── package.json
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `PUT /api/auth/update-profile` - Update user profile

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License.

## Author

Rohit Bhardwaj ✨


