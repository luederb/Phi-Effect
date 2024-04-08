import "./Projects.css"
import axios from "axios";
import {Logger} from "../../Logger/Logger.tsx";
import {useEffect, useState} from "react";
import {Project} from "../../Types/Project.ts";
import {Link} from "react-router-dom";
import ProjectCard from "./ProjectCard/ProjectCard.tsx";

export default function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);
    const [favoriteProjects, setFavoriteProjects] = useState([]);

    const currentUserId = localStorage.getItem("currentUserId");

    function handleProjectClick(id: string) {
        if (expandedProjectId === id) {
            setExpandedProjectId(null);
        } else {
            setExpandedProjectId(id);
        }
    }

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

    function fetchFavoriteProjectsForCurrentUser() {
        axios.get("/api/users/me", {
            headers: {
                "Authorization": `Bearer ${currentUserId}`
            }
        })
            .then(response => {
                setFavoriteProjects(response.data.favoriteProjects);
                Logger.log("Favorite projects of current user:", response.data.favoriteProjects);
            })
            .catch((error) =>
                Logger.error("An error occurred while loading the favorite projects for the current user:", error))
    }

    useEffect(() => {
        fetchAllProjects();
        fetchFavoriteProjectsForCurrentUser();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="projects-container">
            <div className="projects-h2-container">
                <h2>Projects</h2>
            </div>
            <ul className="project-card-list">
                {projects.map((project) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        isExpanded={project.id === expandedProjectId}
                        onProjectClick={handleProjectClick}
                        favoriteProjects={favoriteProjects}
                        handleFetchFavoriteProjectsForCurrentUser={fetchFavoriteProjectsForCurrentUser}
                    />)
                )}
            </ul>
            <div className="projects-link-container">
                <Link to="/projects/create" className="link-as-button">Create new project</Link>
            </div>
        </div>
    )
}