import "./ProjectCard.css";
import {Project} from "../../../Types/Project.ts";

type ProjectProps = {
    project: Project;
}
export default function ProjectCard({project}: Readonly<ProjectProps>) {

    return (
        <div className="project-card">
            <h3>{project.name}</h3>
            <div className="project-card-line">
                <p>Project Owner: </p>
                <p>{project.projectOwner}</p>
            </div>
            <div className="project-card-line">
                <p>City: </p>
                <p>{project.city}</p>
            </div>
            <div className="project-card-line">
                <p>Description: </p>
                <p>{project.description}</p>
            </div>
            <div className="project-card-line">
                <p>Genre: </p>
                <p>{project.genre}</p>
            </div>
            <div className="project-card-line">
                <p>Status: </p>
                <p>{project.status}</p>
            </div>
            <div className="project-card-line">
                <p>Latitude: </p>
                <p>{project.gpsCoordinates.latitude}</p>
            </div>
            <div className="project-card-line">
                <p>Longitude: </p>
                <p>{project.gpsCoordinates.longitude}</p>
            </div>
            <div className="project-card-line">
                <p>Project Start: </p>
                <p>{new Date(project.projectStart).toLocaleDateString()}</p>
            </div>
            <div className="project-card-line">
                <p>Project End: </p>
                <p>{new Date(project.projectEnd).toLocaleDateString()}</p>
            </div>
        </div>
    )
}