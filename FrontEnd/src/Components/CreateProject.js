import React, { useState } from 'react';
import axios from '../axios-config';
import '../CSS/CreateProject.css';

const CreateProject = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState('');


  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('type', type);
    formData.append('description', description);
    Array.from(images).forEach((image) => {
      formData.append('images', image);
    });

    try {
      const res = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Project created successfully');
      console.log(res.data);
    } catch (error) {
      setMessage('Error creating project');
      console.error(error);
    }
  };

  return (
    <div className="create-project-container">
      <form onSubmit={handleSubmit} className="create-project-form">
        <h2>Create New Project</h2>
        {message && <p>{message}</p>}
        <div className="input-group">
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="input-group">
          <label>Type</label>
          <input type="text" value={type} onChange={(e) => setType(e.target.value)} required />
        </div>
        <div className="input-group">
          <label>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
        </div>
        <div className="input-group">
          <label>Images</label>
          <input type="file" onChange={handleFileChange} multiple required />
        </div>
        <button type="submit">Create Project</button>
      </form>
    </div>
  );
};

export default CreateProject;
