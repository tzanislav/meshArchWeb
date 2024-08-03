import axios from "../axios-config";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../CSS/ProjectView.css';
import ImageCarousel from './ImageCarousel';


function ProjectView() {

    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
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

    if (!project) {
        return <div>Loading...</div>;
    }

    return (
        <div className='project-view'>
            {message && <p>{message}</p>}
            <div className='project-hero-image'>
                <img src={project.urls[0]} alt='Project' />
            </div>

            <div className='project-hero-text'>
                <h1>Project Name</h1>
            </div>
            <hr />

            <div className='project-details'>
                <p>{project.description}</p>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum soluta dolorum, impedit optio neque temporibus error culpa hic! Excepturi accusantium dicta odio fugiat natus officia unde sequi provident ea vitae?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum soluta dolorum, impedit optio neque temporibus error culpa hic! Excepturi accusantium dicta odio fugiat natus officia unde sequi provident ea vitae?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum soluta dolorum, impedit optio neque temporibus error culpa hic! Excepturi accusantium dicta odio fugiat natus officia unde sequi provident ea vitae?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum soluta dolorum, impedit optio neque temporibus error culpa hic! Excepturi accusantium dicta odio fugiat natus officia unde sequi provident ea vitae?</p>
            </div>

            <hr />

            <div className='project-images'>
                <ImageCarousel images={project.urls} />                
            </div>

        </div>
    );
}

export default ProjectView;