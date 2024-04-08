import "./ProjectCard.css";
import {Project} from "../../../Types/Project.ts";
import Icons from "../../../assets/Icons/Icons.tsx";
import {Link} from "react-router-dom";
import ConvertGpsDecimalToDMS from "../../ConvertGpsDecimalToDMS/ConvertGpsDecimalToDMS.ts";
import {useEffect, useRef} from "react";

type ProjectProps = {
    project: Project;
    isExpanded: boolean;
    onProjectClick: (id: string) => void;
}
export default function ProjectCard({project, isExpanded, onProjectClick}: Readonly<ProjectProps>) {
    const cardRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (isExpanded && cardRef.current) {
            cardRef.current.scrollIntoView({ behavior: 'smooth', block: "center"});
        }
    }, [isExpanded]);
    return (
        <button ref={cardRef} className="project-card" onClick={() => onProjectClick(project.id)}>
            <div
                className={`project-card-content ${isExpanded ? "show" : ""}`}>
                <div className="project-name-and-edit-icon">
                    <h3>{project.name}</h3>
                    <Link to={`/projects/edit/${project.id}`}>
                        <Icons variant="edit" backgroundColor="var(--standardFondColor)"
                               strokeColor="var(--standardFondColor)" strokeWidth={3} size={25}/>
                    </Link>
                </div>
                <div className="project-card-line">
                    <p>City: </p>
                    <p>{project.city}</p>
                </div>
                <div className="project-card-line">
                    <p>Genre: </p>
                    <p>{project.genre}</p>
                </div>
                <div className="project-card-line">
                    <p>Project Start: </p>
                    <p>{new Date(project.projectStart).toLocaleDateString()}</p>
                </div>
                <div className="project-card-line">
                    <p>Project End: </p>
                    <p>{new Date(project.projectEnd).toLocaleDateString()}</p>
                </div>
                <div className="project-card-line">
                    <p>Project Owner: </p>
                    <p>{project.projectOwner}</p>
                </div>
                <div className="project-card-line">
                    <p>Description: </p>
                    <p>{project.description}</p>
                </div>
                <div className="project-card-line">
                    <p>Status: </p>
                    <p>{project.status}</p>
                </div>
                <div className="project-card-line">
                    <p>Location: </p>
                    <p>{ConvertGpsDecimalToDMS(project.gpsCoordinates.latitude, false)} {ConvertGpsDecimalToDMS(project.gpsCoordinates.longitude, true)}</p>
                </div>
            </div>
        </button>
    )
}