import React from 'react';
import { Link } from 'react-router-dom';

const Sitemap = () => {
  return (
    <div>
      <h1>Website Sitemap</h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/blog">Blog</Link></li>
      </ul>
    </div>
  );
};

export default Sitemap;