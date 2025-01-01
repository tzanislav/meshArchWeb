import React from 'react';
import { Link } from 'react-router-dom';
import Padding from '../Components/Padding';
const Sitemap = () => {
  return (
    <div>
        <Padding size="200px"/>
      <h1>Website Sitemap</h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/blog">Blog</Link></li>
      </ul>
    </div>
  );
};

export default Sitemap;