import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../CSS/ProjectDetail.css';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/vizProject/${id}`);
        setProject(res.data);
      } catch (error) {
        console.error('Error fetching project details', error);
      }
    };

    fetchProject();
  }, [id]);

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className="project-detail-container">
      <h2>{project.name}</h2>
      <p>Type: {project.type}</p>
      <p>Description: {project.description}</p>
      <div className="project-images">
        {project.urls.map((url, index) => (
          <img key={index} src={url} alt={`Project Image ${index + 1}`} />
        ))}
      </div>
    </div>
  );
};

export default ProjectDetail;
