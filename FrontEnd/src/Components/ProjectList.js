import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../CSS/ProjectList.css'; // Adjusted import path

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get('http://localhost:5000/vizProject');
        setProjects(res.data);
      } catch (error) {
        console.error('Error fetching projects', error);
      }
    };

    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/vizProject/${id}`);
      setProjects(projects.filter(project => project._id !== id));
    } catch (error) {
      console.error('Error deleting project', error);
    }
  };

  return (
    <div className="project-list-container">
      <h2>Project List</h2>
      <Link to="/create-project">
        <button className="create-button">Create Project</button>
      </Link>
      <ul className="project-list">
        {projects.map((project) => (
          <li key={project._id} className="project-list-item">
            <span>{project.name}</span>
            <div>
              <Link to={`/project/${project._id}`}>
                <button className="view-button">View</button>
              </Link>
              <button className="delete-button" onClick={() => handleDelete(project._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
