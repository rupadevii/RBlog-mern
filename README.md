# RBlog - MERN Blogging Platform

A full-stack blogging platform built with the MERN stack, featuring secure user authentication, image uploads, and a modern React frontend for creating, managing, and reading blog posts.

🔗 **Live Demo:** [rblog-mern.vercel.app](https://rblog-mern.vercel.app)

---

## ✨ Features

- **User Authentication** — Secure signup/login/logout with JWT-based sessions, plus a "get current user" endpoint for session persistence
- **Password Security** — Passwords hashed using bcrypt before storage
- **Image Uploads** — Blog post images and profile pictures uploaded and hosted via Cloudinary (handled through Multer middleware)
- **Blog Management** — Create, edit, delete, and view posts; posts can be fetched individually, by user, by search, or by trending status
- **Likes** — Users can like and unlike posts
- **Comments** — Users can add and delete comments on posts
- **Social/Follow System** — Users can follow and unfollow other users, view another user's public profile, and get suggested accounts to follow
- **Search & Discovery** — Dedicated endpoints for searching posts and surfacing trending posts
- **Responsive UI** — Built with React and Tailwind CSS
- **Loading States** — Skeleton loading screens (`react-loading-skeleton`) for a smoother UX
- **Modal-Based Interactions** — Uses `react-modal` for dialogs/popups
- **Client-Side Routing** — Multi-page navigation via React Router

---

## 🛠 Tech Stack

| Category | Technologies |
|---|---|
| **Frontend** | React 19, Tailwind CSS 4, React Router DOM |
| **Backend** | Node.js, Express 5 |
| **Database** | MongoDB (via Mongoose) |
| **Authentication** | JWT (`jsonwebtoken`), `cookie-parser` (HTTP-only cookie-based sessions), `bcrypt` (password hashing) |
| **APIs** | Cloudinary (image hosting/management) |
| **Libraries** | Axios, Redux Toolkit (`@reduxjs/toolkit`, `react-redux`), Lucide React (icons), React Modal, React Loading Skeleton, Multer (file upload handling) |
| **Deployment** | Vercel |
| **Other Tools** | Vite, ESLint, dotenv, cors, Nodemon |

---

## 📁 Project Structure

```
RBlog-mern/
├── backend/                # Express API server
│   ├── .env             # Environment variables
│   ├── index.js             # Server entry point
│   ├── routes/               # Express route definitions
│   │   ├── auth.route.js       # Register, login, logout, get current user
│   │   ├── post.route.js       # Post CRUD, likes, search, trending
│   │   ├── comment.route.js    # Add/delete comments
│   │   └── user.route.js       # Profile, follow/unfollow, suggested users
│   ├── controllers/           # Controller logic (auth, post, comment, user)
│   │   ├── auth.controller.js       # Register, login, logout, get current user
│   │   ├── post.controller.js       # Post CRUD, likes, search, trending
│   │   ├── comment.controller.js    # Add/delete comments
│   │   └── user.controller.js       # Profile, follow/unfollow, suggested users
│   ├── middleware/ 
│   │   ├── auth.middleware.js       # Authenticate user
│   │   └── multer.middleware.js       # Upload images
│   ├── models/           # Models (auth, post, comment, user)
│   │   ├── post.model.js       # Post model
│   │   ├── comment.model.js    # Comment model
│   │   └── user.model.js       # User model
│   ├── config/           # Configuration logic (cloudinary, mongoose)
│   │   ├── cloudinary.config.js       # Configure cloudinary for image upload
│   │   └── mongoose.config.js         # Configure database connection
│   └── utils/           # Utility functions
│       └── token.util.js    # Generate token
├── frontend/               # React (Vite) client application
│   ├── src/                  # Application source code
│   │   ├── App.jsx           # Main app component
│   │   ├── index.css         # styles
│   │   ├── main.jsx          # Entry point
│   │   ├── utils/            # Utility functions
│   │   │   └── date.js
│   │   ├── services/         # API client (api.js)
│   │   │   └── api.js
│   │   ├── routes/           # Protected route logic
│   │   │   └── ProtectedRoute.jsx
│   │   ├── redux/            # redux store and slices
│   │   │   ├── store.js
│   │   │   └── features/
│   │   │       ├── authSlice.js
│   │   │       └── postSlice.js
│   │   ├── pages/           # Page components
│   │   │   ├── CreatePost.jsx
│   │   │   ├── EditPost.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Post.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Search.jsx
│   │   │   └── UpdateProfile.jsx
│   │   ├── context/           # Context logic
│   │   │   └── ThemeContext.jsx
│   │   ├── components/        # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── skeleton/
│   │   │   │   └── CardSkeleton.jsx
│   │   │   ├── search/
│   │   │   │   ├── SearchPosts.jsx
│   │   │   │   ├── SearchSuggestions.jsx
│   │   │   │   └── SearchUsers.jsx
│   │   │   ├── post/
│   │   │   │   ├── CommentForm.jsx
│   │   │   │   ├── DeletePost.jsx
│   │   │   │   └── Like.jsx
│   │   │   └── home/
│   │   │       ├── SuggestedFollows.jsx
│   │   │       └── TrendingPosts.jsx
│   │   └── assets/             # Images
│   │       └── default.png 
│   ├── public/
│   │   └── vite.svg
│   ├── .env                #Environment variables
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── vercel.json
│   └── vite.config.js              
└── .gitignore
```

---

## ⚙️ Installation

### 1. Clone the repository
```bash
git clone https://github.com/rupadevii/RBlog-mern.git
cd RBlog-mern
```

### 2. Install dependencies
Install backend dependencies:
```bash
cd backend
npm install
```

Install frontend dependencies:
```bash
cd ../frontend
npm install
```

### 3. Configure environment variables
Create a `.env` file inside the `backend/` directory and add the required variables (see [Environment Variables](#-environment-variables) below).

### 4. Database setup
Ensure you have a MongoDB instance running (local or a cloud instance such as MongoDB Atlas) and set its connection string in the backend `.env` file.

### 5. Run the development server
Run the backend (from the `backend/` directory):
```bash
npm start
```
This runs `nodemon index.js`, so the server restarts automatically on changes.

Run the frontend (from the `frontend/` directory):
```bash
npm run dev
```
The frontend should now be running locally (default Vite port is `http://localhost:5173`), and is configured to proxy API requests to `http://localhost:5000`.

---

## 🔑 Environment Variables

| Variable | Description | Example Value |
|---|---|---|
| `PORT` | Port the Express backend server listens on | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/rblog` |
| `JWT_SECRET_KEY` | Secret key used to sign and verify JWTs | `your_jwt_secret_here` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary account cloud name | `your_cloud_name` |
| `CLOUDINARY_API_KEY` | Cloudinary API key | `your_api_key` |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | `your_api_secret` |

---

## 🚀 Usage

1. Open the application in your browser.
2. Sign up for a new account or log in with existing credentials.
3. Once authenticated, create, edit, or manage your blog posts, including uploading images.
4. Like posts, leave comments, and follow other users.
5. Browse trending posts, search for specific posts, or view another user's profile and posts.

---

## 🔌 API Endpoints

### Auth (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/register` | Register a new user account | No |
| POST | `/login` | Log in and receive a session (JWT) | No |
| POST | `/logout` | Log out and clear the session | No |
| GET | `/me` | Get the currently authenticated user's info | Yes |

### Posts (`/api/posts`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/` | Get all posts | No |
| GET | `/trending` | Get trending posts | No |
| GET | `/search` | Search posts | No |
| GET | `/:id` | Get a single post by ID | No |
| GET | `/user/:userId` | Get all posts by a specific user | No |
| POST | `/` | Create a new post (supports image upload via `post-pic`) | Yes |
| PUT | `/:id` | Edit an existing post (supports image upload via `post-pic`) | Yes |
| DELETE | `/:id` | Delete a post | Yes |
| POST | `/like/:postId` | Like a post | Yes |
| POST | `/unlike/:postId` | Unlike a post | Yes |

### Comments (`/api/comments`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/` | Add a comment to a post | Yes |
| DELETE | `/:commentId` | Delete a comment | Yes |

### Users (`/api/users`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/profile` | Get the logged-in user's profile info | Yes |
| POST | `/profile` | Update profile (supports image upload via `profile-pic`) | Yes |
| GET | `/user-profile/:id` | Get another user's public profile info | No |
| POST | `/follow/:id` | Follow a user | Yes |
| POST | `/unfollow/:id` | Unfollow a user | Yes |
| GET | `/suggested` | Get suggested users to follow | Yes |

---

## 🏗 Architecture / Workflow

- **Request Flow:** The React frontend (proxied to `http://localhost:5000` in development) sends requests to the Express backend, which is organized into `auth`, `post`, `comment`, and `user` route modules, each delegating to its own controller.
- **Authentication Flow:** Users register/log in via the backend, which issues a JWT. Protected routes are guarded by a shared `authMiddleware` (used across auth, post, comment, and user routes). Based on the dependencies (`jsonwebtoken` + `cookie-parser`), the token is likely stored in an HTTP-only cookie and verified on each protected request.
- **Database Interaction:** MongoDB is used as the primary data store, accessed via Mongoose models/schemas, covering users, posts, and comments, including relational data like likes and follows.
- **File Uploads:** Two dedicated Multer configurations handle uploads — `upload` for profile pictures (`profile-pic`) and `postUpload` for post images (`post-pic`) — before forwarding files to Cloudinary.
- **Social Graph:** Follow/unfollow endpoints and a "suggested follows" endpoint support a lightweight social layer on top of the blogging functionality.
- **State Management:** Redux Toolkit (`@reduxjs/toolkit`, `react-redux`) manages global frontend state (e.g., current user/auth state).
- **External APIs:** Cloudinary is used to host and manage uploaded images (post images and profile pictures), with Multer handling the file upload on the backend before forwarding to Cloudinary.

---

## 🔒 Security Features

- **Authentication:** JWT-based, issued on login, verified via a shared `authMiddleware` on protected routes
- **Password Hashing:** Passwords are hashed using `bcrypt` before being stored in the database
- **JWT/Cookies:** JWTs are used for session handling, likely delivered via HTTP-only cookies (`cookie-parser` is used)
- **Route-Level Authorization:** All mutating actions (creating/editing/deleting posts, comments, profile updates, follow/unfollow, liking) are protected by `authMiddleware`; read endpoints (listing/searching/viewing posts and public profiles) are open
- **CORS:** Enabled via the `cors` package

---

## ⚡ Performance Optimizations

- **Skeleton Loading States** — `react-loading-skeleton` is used to improve perceived performance while content loads

---

## 🔮 Future Improvements

- Add categories/tags functionality
- Add rich text/markdown editor support for post creation
- Add rate limiting on authentication and post-creation endpoints
- Add pagination for post listings, search results, and comments

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature-name`)
3. Commit your changes (`git commit -m "Add your feature"`)
4. Push to the branch (`git push origin feature/your-feature-name`)
5. Open a Pull Request

---