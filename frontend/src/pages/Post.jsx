import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import CommentForm from '../components/CommentForm'
import { Pencil, ThumbsUp, Trash } from 'lucide-react'
import DeletePost from '../components/DeletePost'
import Modal from 'react-modal'
import { useTheme } from '../context/ThemeContext'

export default function Post() {
    const {id} = useParams()
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true)
    const {isAuthenticated} = useAuth()
    const {user} = useAuth()
    const navigate = useNavigate()
    const [modalIsOpen, setIsOpen] = useState(false);
    const {theme} = useTheme()
    const [isLiked, setIsLiked] = useState(false)

    function openModal() {
    setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }
    
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            color: theme === "dark" ? "white" : "black",
            backgroundColor: theme==="dark" ? "black" : "white"
        },
    };

    const formattedDate = (createdAt) => {
        const date = new Date(createdAt)
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return new Intl.DateTimeFormat('en-GB', options).format(date);
    }

    const formattedDateComment = (createdAt) => {
        const date = new Date(createdAt)
        const options = { day: '2-digit', month: 'short'};
        return new Intl.DateTimeFormat('en-GB', options).format(date);
    }

    useEffect(() => {
        async function loadPosts(){
            try{
                const res = await axios.get(`/api/posts/${id}`)
                setPost(res.data.post)
                setComments(res.data.comments)
                console.log(res.data.comments)
                
            }catch(error){
                console.log(error)
            }
            finally{
                setLoading(false)
            }
        }
        loadPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function editPost(){
        navigate(`/edit/${post._id}`, {state: post})
    }
    
    return (
        <main className={`mt-18 px-60 min-h-screen`}>
            <section className='py-12 px-18 border-b-2 border-gray-300'>
                {loading ? (
                    <div className='flex items-center justify-center'>Loading</div>
                ) : (
                    <div>
                        <div className='flex justify-between items-center'>
                            <h1 className='text-5xl font-bold my-5'>{post.title}</h1>
                            {user && post.author._id === user._id && (
                                <div className='flex gap-2 items-center'>
                                    <button className='bg-green-700 rounded-xl p-3 hover:bg-green-600' onClick={editPost}><Pencil size={18} color='white'/></button>
                                    <button className='bg-red-700 rounded-xl p-3 gap-2 hover:bg-red-600' onClick={openModal}><Trash size={18} color='white'/></button>
                                    <Modal
                                        isOpen={modalIsOpen}
                                        onRequestClose={closeModal}
                                        style={customStyles}
                                        contentLabel="Example Modal"
                                    >
                                        <DeletePost closeModal={closeModal} postId={post._id}/>
                                    </Modal>
                                </div>
                            )}
                        </div>
                        <div className='flex items-center gap-3 mb-5'>
                            <img src={post.author?.avatar} className='w-8 rounded-full'/>
                            <span className='hover:underline underline-offset-2 hover:cursor-pointer'>{post.author?.username}</span>
                            {post.createdAt && <span>{formattedDate(post.createdAt)}</span>}
                        </div>
                        <div className=''>
                            {post.image && (
                                <img src={post.image} className='w-400 mb-10' alt={post.title}/>
                            )}
                            <p className='text-lg'>{post.content}</p>
                        </div>
                    </div>
                )}
            </section>
            
            <section className='pt-6 pb-6 px-10'>
                <div className='border-b-2 border-stone-200 pb-6'>
                    <h1 className='text-xl font-bold my-2'>Comments ({comments.length})</h1>

                    {!isAuthenticated ? (
                        <div className='text-base'>
                            <Link to="/login">
                                <span className='hover:underline underline-offset02 mx-1'>Login</span>
                            </Link>
                                or
                            <Link to="/register">
                                <span className='hover:underline underline-offset-2 mx-1'>Signup</span>
                            </Link>
                            to comment</div>
                    ) : (
                        <CommentForm postId={post._id}/>
                    )}
                </div>


                {comments.length === 0 ? (
                    <div className='mt-4'>No comments yet.</div>
                ) : (
                    <div className='mt-6 flex flex-col gap-6'>
                        {comments.map(comment => (
                            <div key={comment._id} className={`border-b-2 border-stone-${theme==="dark" ? "800" : "200"}`}>
                                <div className='flex gap-3 items-center'>
                                    <img src={comment.user.avatar} className='w-10 rounded-full'/>
                                    <div>
                                        <p className='text-m font-bold my-0'>{comment.user.username}</p>
                                        <span className='font-thin text-sm my-0'>{formattedDateComment(post.createdAt)}</span>
                                    </div>
                                </div>
                                <div className='px-2 my-3'>
                                    <p>{comment.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </main>
    )
}
