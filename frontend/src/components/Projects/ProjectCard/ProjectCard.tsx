import "./ProjectCard.css";
import {Project} from "../../../Types/Project.ts";
import Icons from "../../../assets/Icons/Icons.tsx";
import {Link} from "react-router-dom";
import ConvertGpsDecimalToDMS from "../../ConvertGpsDecimalToDMS/ConvertGpsDecimalToDMS.ts";
import {useEffect, useRef} from "react";

type ProjectProps = {
    project: Project;
    isExpanded: boolean;
    isFavorite: boolean;
    onProjectClick: (id: string) => void;
    handleUpdateFavoriteProjectsForCurrentUser: (projectId: string) => void;
}
export default function ProjectCard({
                                        project,
                                        isExpanded,
                                        isFavorite,
                                        onProjectClick,
                                        handleUpdateFavoriteProjectsForCurrentUser
                                    }: Readonly<ProjectProps>) {
    const cardRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (isExpanded && cardRef.current) {
            cardRef.current.scrollIntoView({behavior: "smooth", block: "center"});
        }
    }, [isExpanded]);

    return (
        <div className="project-card">
            <div
                className={`project-card-content ${isExpanded ? "show" : ""}`}>
                <div className="project-name-and-edit-icon">
                    <button className="favorite-button"
                            onClick={() => handleUpdateFavoriteProjectsForCurrentUser(project.id)}>
                        {isFavorite ?
                            <Icons variant="favoriteFilled" backgroundColor="var(--standardFondColor)"
                                   strokeColor="var(--standardFondColor)" strokeWidth={1} size={25}/>
                            :
                            <Icons variant="favorite" backgroundColor="var(--standardFondColor)"
                                   strokeColor="var(--standardFondColor)" strokeWidth={1} size={25}/>
                        }
                    </button>
                    <button className="project-title-button" onClick={() => onProjectClick(project.id)}>
                        <h3>{project.name}</h3>
                    </button>
                    <Link to={`/projects/edit/${project.id}`}>
                        <Icons variant="edit" backgroundColor="var(--standardFondColor)"
                               strokeColor="var(--standardFondColor)" strokeWidth={3} size={25}/>
                    </Link>
                </div>
                <button onClick={() => onProjectClick(project.id)}>
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
                </button>
            </div>
        </div>
    )
}