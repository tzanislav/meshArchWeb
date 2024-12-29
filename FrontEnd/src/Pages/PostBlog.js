import React from 'react';
import BlogPostForm from '../Components/BlogPostForm';
import '../CSS/BlogPostForm.css';
import Padding from '../Components/Padding';
import { AuthContext } from '../context/AuthContext';
import { useParams } from 'react-router-dom';

function PostBlog() {

    const { authToken } = React.useContext(AuthContext);
    const { _id } = useParams();

    if (!authToken) {
        window.location.href = '/login';
    }

    return (
        <div>
            <Padding size="200px" />
            <BlogPostForm id={_id} />
        </div>
    );
}

export default PostBlog;