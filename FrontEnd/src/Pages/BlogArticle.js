import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Padding from '../Components/Padding';
import axios from '../axios-config';


function BlogArticle() {
    const { id } = useParams();

    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await axios.get(`/api/blog/${id}`);
                setArticle(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching article:', error);
            }
        };

        fetchArticle();
    }, [id]);

    if (loading) return <p>Loading article...</p>;

    return (
        <div className='blog-article'>
            <Padding size="100px" />
            <h1>{article.title}</h1>
            <h5>{article.createdAt.split('T')[0]}</h5>
            <img src={article.image} alt={article.title} />
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
            <p>By {article.author}</p>
            <a href={article.source}>Source</a>
            <button onClick={() => window.history.back()}>Back</button>
        </div>
    );
}

export default BlogArticle;