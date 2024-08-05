import React from "react";
import { useState, useEffect } from 'react';
import axios from '../axios-config';
import FeaturedProject from './FeaturedProject';
import ImageLightbox from "./ImageLightbox";

function ProjectColumns() {
    const [projects, setProjects] = useState([]);
    const [project, setProject] = useState(null);
    const [message, setMessage] = useState('');
    const [id, setId] = useState(null);
    const [shownImages, setShownImages] = useState(false);

    const col1Projects = [];
    const col2Projects = [];
    const col3Projects = [];


    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await axios.get('/vizProject');
                setProjects(res.data);
                setId(res.data[0]._id);

            } catch (error) {
                console.error('Error fetching projects', error);
            }
        };
        fetchProjects();
    }
        , []);


    useEffect(() => {

        if (!id) return;

        const fetchProject = async () => {
            try {
                const res = await axios.get(`/vizProject/${id}`);
                setProject(res.data);
                setMessage('');
            }
            catch (error) {
                console.error('Error fetching project details', error);
                setMessage('Error fetching project details');
            }
        }

        fetchProject();

    }, [id]);

    useEffect(() => {

        document.body.style.overflow = shownImages ? 'hidden' : 'auto';

    }, [shownImages]);

    


    const handleProjectClick = (URLs) => {
        setShownImages(URLs);
        console.log(URLs);
    }


    if (!project) {
        return <div>Loading...</div>;
    }


    var index = 0;
    projects.forEach((project) => {
        if (index % 3 === 0) {
            col1Projects.push(project);
        }
        else if (index % 3 === 1) {
            col2Projects.push(project);
        }
        else {
            col3Projects.push(project);
        }
        index++;
    });




    return (
        <div className="home-featured-projects-container">
            {shownImages && <ImageLightbox images={shownImages} close={() => setShownImages(false)} />}
            <div className="home-featured-project-col1 project-column">
                {col1Projects.map((project, index) => (
                    <FeaturedProject key={project._id} project={project} index={index + 1} open={handleProjectClick} />
                ))}
            </div>
            <div className="home-featured-project-col2 project-column">
                {col2Projects.map((project, index) => (
                    <FeaturedProject key={project._id} project={project} index={index + 1} open={handleProjectClick} />
                ))}
            </div>
            <div className="home-featured-project-col3 project-column">
                {col3Projects.map((project, index) => (
                    <FeaturedProject key={project._id} project={project} index={index + 1} open={handleProjectClick} />
                ))}
            </div>
        </div>
    );

}


export default ProjectColumns;
