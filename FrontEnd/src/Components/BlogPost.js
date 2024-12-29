import React, { useEffect, useState } from 'react';
import axios from '../axios-config';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function BlogPost({ id }) {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const { authToken } = React.useContext(AuthContext);

    function stripHTMLTags(input) {
        return input.replace(/<[^>]*>/g, '').trim();
    }

    function limitContentLength(content, wordLimit = 100) {
        const words = content.split(' '); // Split content into words
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...'; // Join first 100 words and add ellipsis
        }
        return content; // If less than 100 words, return as is
    }


    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await axios.get(`/api/blog/${id}`);
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

    const deletePost = async () => {
        try {
            await axios.delete(`/api/blog/${id}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },


            });
            window.location.reload();
        } catch (err) {
            console.error('Error deleting blog post:', err);
            setError('Error deleting blog post.');
        }
    }

    if (loading) return <p>Loading blog post...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="blog-post">
            <h5>{post.createdAt.split('T')[0]}</h5>
            <h3>{post.title}</h3>
            {authToken && <Link to={`/edit-blog/${id}`}>Edit</Link>}
            <div className='post-content'>
                <img src={post.image} alt={post.title} />
                <div>
                    <p>{limitContentLength( stripHTMLTags(post.content), 50)} </p> <br></br><br></br>
                    <Link to={`/blog/${id}`}>Прочетете още.</Link>
                </div>
            </div>
            <div className='post-footer'>

                <p>By {post.author}</p>
            </div>
            {authToken && (
                <div className='post-footer'>
                    <button onClick={deletePost}>Delete</button>
                </div>
            )}
        </div>
    );
}

export default BlogPost;
