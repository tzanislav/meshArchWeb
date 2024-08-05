import React from "react";

function FeaturedProject({ project, open}) {

    return (
        <div className='featured-project' >
            <img src={project.urls[0]} alt={project.name} onClick={() => open(project.urls)} />
        </div>
    );
}

export default FeaturedProject;
