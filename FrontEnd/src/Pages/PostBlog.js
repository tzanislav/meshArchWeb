import React from 'react';
import BlogPostForm from '../Components/BlogPostForm';
import '../CSS/BlogPostForm.css';
import Padding from '../Components/Padding';
import { AuthContext } from '../context/AuthContext';

function PostBlog() {

      const { authToken } = React.useContext(AuthContext);

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