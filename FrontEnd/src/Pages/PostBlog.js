import React from 'react';
import BlogPostForm from '../Components/BlogPostForm';
import '../CSS/BlogPostForm.css';
import Padding from '../Components/Padding';
import {authToken} from '../context/AuthContext';}

function PostBlog() {

    if (!authToken) {
        window.location.href = '/login';
    }

    return (
        <div>
            <Padding size="200px" />
            <BlogPostForm />
        </div>
    );
}

export default PostBlog;