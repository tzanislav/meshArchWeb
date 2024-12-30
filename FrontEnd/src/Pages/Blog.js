import React, { useEffect, useState } from 'react';
import BlogPost from '../Components/BlogPost';
import Padding from '../Components/Padding';
import axios from '../axios-config';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import '../CSS/Blog.css';

function Blog() {

    const [posts, setPosts] = useState([]); // Ensure default is an array
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const { authToken } = React.useContext(AuthContext);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get('/api/blog');
                console.log(res.data); // Debug the response structure
                if (Array.isArray(res.data)) {
                    // Sort posts by createdAt in descending order (newest first)
                    const sortedPosts = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    setPosts(sortedPosts);
                } else {
                    setMessage('Unexpected response format.');
                }
            } catch (error) {
                console.error('Error fetching blog posts:', error);
                setMessage('Error fetching blog posts.');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);



    return (
        <div>
            <div className='blog-container'>
                <Padding size="80px" />
                <h1>Новини</h1>

                <a href="https://mesharch.studio/api/blog/rss" target="_blank">
                    <h5> RSS Feed</h5>
                </a>

                {authToken && (
                    <div className='new-post-button'>
                        <Padding size="150px" />
                        <Link to='/post-blog'>New Post</Link>
                    </div>
                )}
                {loading && <p>Loading...</p>}
                {message && <p>{message}</p>}
                {!loading && Array.isArray(posts) && posts.map((post) => (
                    <BlogPost key={post._id} id={post._id} />
                ))}
            </div>
        </div>
    );
}

export default Blog;
