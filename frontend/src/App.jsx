import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Post from "./pages/Post";
import Profile from "./pages/Profile";
import UpdateProfile from "./pages/UpdateProfile";
import ProtectedRoute from "./routes/ProtectedRoute";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import { Delete } from "lucide-react";
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function App() {
    return (
        <>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/post/:id" element={<Post/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
                <Route path="/update-profile" element={<ProtectedRoute><UpdateProfile/></ProtectedRoute>}/>
                <Route path="/create" element={<CreatePost/>}/>
                <Route path='/edit/:id' element={<EditPost/>}/>
                <Route path='/delete/:id' element={<Delete/>}/>
            </Routes>
        </>
    )
}
