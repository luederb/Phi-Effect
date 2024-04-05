import "./CreateNewProject.css";
import {useEffect, useState} from "react";
import axios from "axios";
import {Logger} from "../../../Logger/Logger.tsx";
import {useNavigate} from "react-router-dom";

export default function CreateNewProject() {
    const currentUserId = localStorage.getItem("currentUserId");
    const [isLoading, setIsLoading] = useState(true);
    const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const [newProject, setNewProject] = useState({
        name: "",
        projectOwner: "",
        city: "",
        description: "",
        genre: "",
        status: "",
        gpsCoordinates: {latitude: undefined, longitude: undefined},
        projectStart: new Date(),
        projectEnd: new Date(),
    });

    function fetchUserData() {
        setIsLoading(true);
        axios.get(`/api/users/${currentUserId}`)
            .then(response => {
                Logger.log("User: ", response.data);
                setUserIsLoggedIn(true);
                setNewProject({...newProject, projectOwner: response.data.name})
            })
            .catch(error => {
                Logger.log("Error fetching user data: ", error);
            })
            .finally(() => setIsLoading(false))
    }

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.name === "latitude" || event.target.name === "longitude") {
            setNewProject(prevState => ({
                ...prevState,
                gpsCoordinates: {
                    ...prevState.gpsCoordinates,
                    [event.target.name]: Number(event.target.value)
                }
            }));
        }
        if (event.target.name === "projectStart" || event.target.name === "projectEnd") {
            setNewProject(prevState => ({
                ...prevState,
                [event.target.name]: new Date(event.target.value)
            }));

        } else {
            setNewProject(prevState => ({
                ...prevState,
                [event.target.name]: event.target.value
            }));
        }
    }

    function createProject() {
        if (!newProject.name || newProject.name === "") {
            alert("Please provide a project name");
            return;
        }
        axios.post("/api/projects", newProject)
            .then(response => {
                Logger.log("Project created: ", response.data);
                navigate("/projects");
            })
            .catch(error => {
                Logger.error("Error creating project: ", error);
            })
    }

    useEffect(() => {
        fetchUserData();
        // eslint-disable-next-line
    }, []);

    if (isLoading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }

    if (!userIsLoggedIn) {
        return <p>Please login, to create a new Project</p>
    }
    return (
        <div className="create-new-project-container">
            <h2>Create New Project</h2>
            <form className="create-new-project-form">
                <div className="label-with-input-field">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" value={newProject.name} onChange={handleInputChange}/>
                </div>
                <div className="label-with-input-field">
                    <label htmlFor="projectOwner">Project Owner</label>
                    <input type="text" id="projectOwner" name="projectOwner" value={newProject.projectOwner}
                           onChange={handleInputChange}/>
                </div>
                <div className="label-with-input-field">
                    <label htmlFor="city">City</label>
                    <input type="text" id="city" name="city" value={newProject.city} onChange={handleInputChange}/>
                </div>
                <div className="label-with-input-field">
                    <label htmlFor="description">Description</label>
                    <input type="text" id="description" name="description" value={newProject.description}
                           onChange={handleInputChange}/>
                </div>
                <div className="label-with-input-field">
                    <label htmlFor="genre">Genre</label>
                    <input type="text" id="genre" name="genre" value={newProject.genre}
                           onChange={handleInputChange}/>
                </div>
                <div className="label-with-input-field">
                    <label htmlFor="status">Status</label>
                    <input type="text" id="status" name="status" value={newProject.status}
                           onChange={handleInputChange}/>
                </div>
                <div className="label-with-input-field">
                    <label htmlFor="latitude">Latitude</label>
                    <input type="number" id="latitude" name="latitude" value={newProject.gpsCoordinates.latitude}
                           onChange={handleInputChange}/>
                </div>
                <div className="label-with-input-field">
                    <label htmlFor="longitude">Longitude</label>
                    <input type="number" id="longitude" name="longitude" value={newProject.gpsCoordinates.longitude}
                           onChange={handleInputChange}/>
                </div>
                <div className="label-with-input-field">
                    <label htmlFor="projectStart">Start</label>
                    <input type="date" id="projectStart" name="projectStart"
                           value={newProject.projectStart.toISOString().split("T")[0]}
                           onChange={handleInputChange}/>
                </div>
                <div className="label-with-input-field">
                    <label htmlFor="projectEnd">End</label>
                    <input type="date" id="projectEnd" name="projectEnd"
                           value={newProject.projectEnd.toISOString().split("T")[0]}
                           onChange={handleInputChange}/>
                </div>
            </form>
                <button onClick={createProject}>Create Project</button>
        </div>
    )
}