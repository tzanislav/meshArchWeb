import React, { useEffect, useState } from 'react';
import BlogPost from '../Components/BlogPost';
import Padding from '../Components/Padding';
import axios from '../axios-config';
import '../CSS/Blog.css';

function Blog() {
    const [posts, setPosts] = useState([]); // Ensure default is an array
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get('/api/blogs');
                console.log(res.data); // Debug the response structure
                if (Array.isArray(res.data)) {
                    setPosts(res.data);
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
                <h3>Blog</h3>
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
