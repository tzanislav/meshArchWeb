import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../axios-config'; 
import '../CSS/ProjectList.css';
import Padding from './Padding';
import { AuthContext } from '../context/AuthContext';



const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const { authToken } = React.useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get('/vizProject');
        setProjects(res.data);
      } catch (error) {
        console.error('Error fetching projects', error);
      }
    };

    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/vizProject/${id}`);
      setProjects(projects.filter(project => project._id !== id));
    } catch (error) {
      console.error('Error deleting project', error);
    }
  };

  if(authToken === null){
    //navigate('/login');
    //return null;
  }

  return (
    <div className="project-list-container">
      <Padding/>
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
                <button className="view-button">view</button>
              </Link>
              <Link to={`/edit-project/${project._id}`}>
                <button className="view-button">Edit</button>
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
