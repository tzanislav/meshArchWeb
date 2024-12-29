import React from 'react';
import BlogPostForm from '../Components/BlogPostForm';
import '../CSS/BlogPostForm.css';
import Padding from '../Components/Padding';

function PostBlog() {
    return (
        <div>
            <Padding size="200px" />
            <BlogPostForm />
        </div>
    );
}

export default PostBlog;