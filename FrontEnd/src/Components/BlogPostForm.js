import React, { useEffect, useState } from 'react';
import axios from '../axios-config';
import '../CSS/BlogPostForm.css';

const BlogPostForm = ({ id }) => {
    const [error, setError] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [image, setImage] = useState(null);
    const [status, setStatus] = useState('');
    const [source, setSource] = useState('');

    // Fetch blog post details
    useEffect(() => {
        const fetchBlogPost = async () => {
            if (id) {
                try {
                    const response = await axios.get(`/api/blog/${id}`);
                    console.log('Fetched post:');
                    setTitle(response.data.title);
                    setContent(response.data.content);
                    setAuthor(response.data.author);
                    setSource(response.data.source);
                } catch (error) {
                    setError('Error fetching blog post details.');
                    console.error('Error fetching blog post details', error);
                }
            }
        };

        fetchBlogPost();
    }, [id]);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image && !id) {
            setStatus('Please upload an image.');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('author', author);
        if (image) {
            formData.append('image', image);
        }
        formData.append('source', source);

        console.log('Form data:', formData);
        try {
            if (!id) {
                // Create new blog post
                const response = await axios.post('/api/blog', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                setStatus('Blog post created successfully!');
                console.log(response.data);
            } else {
                // Update existing blog post
                console.log('FormData Content:');
                for (let [key, value] of formData.entries()) {
                    console.log(key, value);
                }
                const response = await axios.put(`/api/blog/${id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                setStatus('Blog post updated successfully!');
                console.log(response.data);
            }
        } catch (error) {
            setStatus(id ? 'Error updating blog post.' : 'Error creating blog post.');
            console.error(error);
        }
    };

    return (
        <div className='blog-post-form'>
            <h2>{id ? 'Edit Blog Post' : 'Create a Blog Post'}</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                            console.log('Title updated:', e.target.value);
                        }
                        }
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Content:</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className='form-group'>
                    <label>Author:</label>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Source:</label>
                    <input
                        type="text"
                        value={source}
                        onChange={(e) => setSource(e.target.value)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Image:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        required={!id} // Required only for new posts
                    />
                </div>
                <button type="submit">{id ? 'Update Blog Post' : 'Create Blog Post'}</button>
            </form>
            {status && <p>{status}</p>}
        </div>
    );
};

export default BlogPostForm;
