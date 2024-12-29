import React, { useState } from 'react';
import axios from '../axios-config';
import '../CSS/BlogPostForm.css';

const BlogPostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [image, setImage] = useState(null);
    const [status, setStatus] = useState('');
    const [source, setSource] = useState('');

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image) {
            setStatus('Please upload an image.');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('author', author);
        formData.append('image', image);
        formData.append('source', source);

        try {
            const response = await axios.post('/api/blog', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setStatus('Blog post created successfully!');
            console.log(response.data);
        } catch (error) {
            setStatus('Error creating blog post.');
            console.error(error);
        }
    };

    return (
        <div className='blog-post-form'>
            <h2>Create a Blog Post</h2>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
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
                    <input type="file" accept="image/*" onChange={handleImageChange} required />
                </div>
                <button type="submit">Create Blog Post</button>
            </form>
            {status && <p>{status}</p>}
        </div>
    );
};

export default BlogPostForm;
