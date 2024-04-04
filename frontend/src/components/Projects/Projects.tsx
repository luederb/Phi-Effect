import "./Projects.css"
import axios from "axios";
import {Logger} from "../../Logger/Logger.tsx";
import {useEffect, useState} from "react";
import {Project} from "../../Types/Project.ts";
import {Link} from "react-router-dom";
import ProjectCard from "./ProjectCard/ProjectCard.tsx";

export default function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);

    function fetchAllProjects() {
        axios.get("/api/projects")
            .then(response => {
                setProjects(response.data);
                Logger.log("Projects: ", response.data);
            })
            .catch(error => {
                Logger.error("Error fetching projects: ", error);
            })
    }

    useEffect(() => {
        fetchAllProjects();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="projects-container">
            <div className="projects-h2-container">
                <h2>Projects</h2>
            </div>
            <ul className="project-card-list">
                {projects.map((project) => {
                        return (
                            <li key={project.id}>
                                <ProjectCard project={project}/>
                            </li>
                        )
                    }
                )}
            </ul>
            <div className="projects-link-container">
                <Link to="/projects/create" className="link-as-button">Create new project</Link>
            </div>
        </div>
    )
}