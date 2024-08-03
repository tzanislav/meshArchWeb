import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axios-config';
import '../CSS/ProjectDetail.css';
import Padding from './Padding';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(`/vizProject/${id}`);
        setProject(res.data);
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
    if (!newImage) return;

    const formData = new FormData();
    formData.append('image', newImage);

    try {
      const res = await axios.post(`http://localhost:5000/upload/${id}/images`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setProject(res.data);
      setNewImage(null);
    } catch (error) {
      console.error('Error adding image', error);
    }
  };

  const handleDeleteImage = async (urlToDelete) => {
    try {
      const res = await axios.delete(`http://localhost:5000/upload/${id}/images`, { data: { url: urlToDelete } });
      setProject(res.data);
    } catch (error) {
      console.error('Error deleting image', error);
    }
  };

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className="project-detail-container">
      <Padding />
      <h2>{project.name}</h2>
      <p>Type: {project.type}</p>
      <p>Description: {project.description}</p>
      <div className="project-images">
        {project.urls.map((url, index) => (
          <div key={index} className="project-image-wrapper">
            <img src={url} alt={`Project Image ${index + 1}`} />
            <button onClick={() => handleDeleteImage(url)}>Delete</button>
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
