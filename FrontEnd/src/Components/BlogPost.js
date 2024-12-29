import React, { useEffect, useState } from 'react';
import axios from '../axios-config';

function BlogPost({ id }) {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await axios.get(`/api/blogs/${id}`);
                setPost(res.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching blog post:', err);
                setError('Error fetching blog post.');
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    if (loading) return <p>Loading blog post...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="blog-post">
            <h3>{post.title}</h3>
            <div className='post-content'>
                <img src={post.image} alt={post.title} />
                <p>{post.content}</p>
            </div>
            <div className='post-footer'>
                <p>By {post.author}</p>
            </div>
        </div>
    );
}

export default BlogPost;
