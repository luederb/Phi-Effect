import "./EditProjectPage.css";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {Project} from "../../../Types/Project.ts";
import {useEffect, useState} from "react";
import {Logger} from "../../../Logger/Logger.tsx";

export default function EditProjectPage() {
    const params = useParams();
    const id: string | undefined = params.id;
    const navigate = useNavigate();

    const [project, setProject] = useState<Project>({
        id: "",
        name: "",
        projectOwner: "",
        city: "",
        description: "",
        genre: "",
        status: "",
        gpsCoordinates: {latitude: 0, longitude: 0},
        projectStart: new Date(),
        projectEnd: new Date(),
    });

    function fetchProjectById(id: string | undefined) {
        axios.get(`/api/projects/${id}`)
            .then(response => {
                Logger.log("Fetched project: ", response.data);
                setProject(response.data);
            })
            .catch(error => {
                    Logger.error("Error fetching project: ", error);
                setProject({
                    id: "",
                    name: "",
                    projectOwner: "",
                    city: "",
                    description: "",
                    genre: "",
                    status: "",
                    gpsCoordinates: {latitude: 0, longitude: 0},
                    projectStart: new Date(),
                    projectEnd: new Date(),
                });
                }
            )
    }

    function handleProjectInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.name === "latitude" || event.target.name === "longitude") {
            setProject(prevState => ({
                ...prevState,
                gpsCoordinates: {
                    ...prevState.gpsCoordinates,
                    [event.target.name]: Number(event.target.value)
                }
            }));
        }
        if (event.target.name === "projectStart" || event.target.name === "projectEnd") {
            setProject(prevState => ({
                ...prevState,
                [event.target.name]: new Date(event.target.value)
            }));

        } else {
            setProject(prevState => ({
                ...prevState,
                [event.target.name]: event.target.value
            }));
        }
    }

    function updateProject() {
        Logger.log("Updating project: ", project)
        if (project.name === "") {
            alert("Please provide a project name");
            return;
        }
        axios.put(`/api/projects/${id}`, project)
            .then(response => {
                Logger.log("Updated project: ", response.data);
                navigate("/projects");
            })
            .catch(error => {
                    Logger.error("Error updating project: ", error);
                }
            )
    }

    useEffect(() => {
        fetchProjectById(id);
        // eslint-disable-next-line
    }, []);

    if (project === null) {
        return <p>Project not found</p>
    }
    if (project === undefined) {
        return <p>loading ... </p>
    }
    return (
        <div className="edit-project-container">
            <h2>Edit Project "{project.name}"</h2>
            <form className="edit-project-form">
                <div className="label-with-input-field">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={project.name} onChange={handleProjectInputChange}/>
                </div>
                <div className="label-with-input-field">
                    <label htmlFor="projectOwner">Project Owner:</label>
                    <input type="text" id="projectOwner" name="projectOwner" value={project.projectOwner} onChange={handleProjectInputChange}/>
                </div>
                <div className="label-with-input-field">
                    <label htmlFor="city">City:</label>
                    <input type="text" id="city" name="city" value={project.city} onChange={handleProjectInputChange}/>
                </div>
                <div className="label-with-input-field">
                    <label htmlFor="description">Description:</label>
                    <input type="text" id="description" name="description" value={project.description} onChange={handleProjectInputChange}/>
                </div>
                <div className="label-with-input-field">
                    <label htmlFor="genre">Genre:</label>
                    <input type="text" id="genre" name="genre" value={project.genre} onChange={handleProjectInputChange}/>
                </div>
                <div className="label-with-input-field">
                    <label htmlFor="status">Status:</label>
                    <input type="text" id="status" name="status" value={project.status} onChange={handleProjectInputChange}/>
                </div>
                <div className="label-with-input-field">
                    <label htmlFor="latitude">Latitude:</label>
                    <input type="text" id="latitude" name="latitude" value={project.gpsCoordinates.latitude} onChange={handleProjectInputChange}/>
                </div>
                <div className="label-with-input-field">
                    <label htmlFor="longitude">Longitude:</label>
                    <input type="text" id="longitude" name="longitude" value={project.gpsCoordinates.longitude} onChange={handleProjectInputChange}/>
                </div>
                <div className="label-with-input-field">
                    <label htmlFor="projectStart">Project Start:</label>
                    <input type="date" id="projectStart" name="projectStart"
                           value={new Date(project.projectStart).toISOString().slice(0, 10)}
                           onChange={handleProjectInputChange}/>
                </div>
                <div className="label-with-input-field">
                    <label htmlFor="projectEnd">Project End:</label>
                    <input type="date" id="projectEnd" name="projectEnd"
                           value={new Date(project.projectEnd).toISOString().slice(0, 10)}
                           onChange={handleProjectInputChange}/>
                </div>
            </form>
            <div>
                <button className="edit-project-cancel-button" onClick={() => navigate("/projects")}>Cancel</button>
                <button className="edit-project-update button" onClick={() => updateProject()}>Update</button>
            </div>
        </div>
    )
}