import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axios-config';
import '../CSS/ProjectDetail.css';
import Padding from './Padding';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(`/vizProject/${id}`);
        setProject(res.data);
        setName(res.data.name);
        setDescription(res.data.description);
      } catch (error) {
        console.error('Error fetching project details', error);
      }
    };

    fetchProject();
  }, [id]);

  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  const handleAddImage = async () => {
    if (!newImage) {
      setMessage('Please select an image to upload');
      return;
    }

  const formData = new FormData();
  formData.append('images', newImage);

    try {
  const res = await axios.post(`/upload/${id}/images`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setProject(res.data);
      setNewImage(null);
      setMessage('Image uploaded successfully');
    } catch (error) {
      setMessage('Error uploading image');
      console.error('Error adding image', error);
    }
  };

  const handleDeleteImage = async (urlToDelete) => {
    try {
  const res = await axios.delete(`/upload/${id}/images`, { data: { url: urlToDelete } });
      setProject(res.data);
    } catch (error) {
      console.error('Error deleting image', error);
    }
  };

  const handleMoveImageToFirst = async (urlToMove) => {
    try {
      const res = await axios.put(`/vizProject/${id}/images/reorder`, {
        url: urlToMove,
      });
      setProject(res.data);
      setMessage('Image moved to the first position');
    } catch (error) {
      setMessage('Error moving image to the first position');
      console.error('Error moving image to the first position', error);
    }
  };

  const handleUpdateProject = async () => {
    try {
      const res = await axios.put(`/vizProject/${id}`, {
        name,
        description,
      });
      setProject(res.data);
      setMessage('Project details updated successfully');
    } catch (error) {
      setMessage('Error updating project details');
      console.error('Error updating project details', error);
    }
  };

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className="project-detail-container">
      <Padding />

      <div className="project-info">
        {message && <p className="project-message">{message}</p>}
          
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Project Name"
          className="project-name-input"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Project Description"
          className="project-description-input"
        />
        <button onClick={handleUpdateProject} className="update-project-button">Save Changes</button>
      </div>

      <div className="project-images">
      {project.urls.map((url, index) => (
        <div key={index} className="project-image-wrapper">
          <img src={url} alt={`Project visualization ${index + 1}`} />
          <div className="project-image-buttons">
            <button onClick={() => handleDeleteImage(url)} className="delete-button">Delete</button>
            <button onClick={() => handleMoveImageToFirst(url)} className="make-first-button">Make First</button>
          </div>
        </div>
      ))}
      </div>

      <div className="image-upload">
        <input type="file" onChange={handleImageChange} />
        <button onClick={handleAddImage}>Add Image</button>
      </div>
    </div>
  );
};

export default ProjectDetail;
