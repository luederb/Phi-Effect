import "./Home.css";

import HomeWithoutLogin from "./HomeWithoutLogin/HomeWithoutLogin";
import axios from "axios";
import {useEffect, useState} from "react";
import {User} from "../../Types/User.ts";
import ProjectsOverviewTable from "./ProjectsOverviewTable/ProjectsOverviewTable.tsx";
import FriendRequests from "./FriendRequests/FriendRequests.tsx";
import {Logger} from "../../Logger/Logger.tsx";

type HomeProps = {
    handleLogin: () => void;
}
export default function Home({handleLogin}: Readonly<HomeProps>) {

    const [userData, setUserData] = useState<User>({
        id: "",
        name: "",
        firstName: "",
        lastName: "",
        email: "",
        picture: ""
    });

    function loadUser() {
        axios.get("/api/users/me")
            .then(response => {
                response.data.newUser = false;
                setUserData(response.data)
                localStorage.setItem("currentUserId", response.data.id)
                Logger.log("User data loaded:", response.data);
            })
            .catch((error) => {
                try {
                    if (error.response.status === 401) {
                        Logger.log("User already logged in. Skip authentication. Load User ID from LocalStorage.");
                        axios.get("/api/users/" + localStorage.getItem("currentUserId"))
                            .then(response => {
                                response.data.newUser = false;
                                setUserData(response.data);
                                Logger.log("User data loaded:", response.data);
                            })
                            .catch(error => {
                                Logger.error("An error occurred while loading already logged in user data:", error);
                            });
                    }
                } catch (error) {
                    Logger.error("An error occurred while loading user data:", error);
                }
            });
    }

    useEffect(() => {
        loadUser();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="home-container">
            {userData.name ?
                <>
                    <h2>Welcome, Lüder</h2>
                    <ProjectsOverviewTable/>
                    <FriendRequests/>
                </>
                :
                <HomeWithoutLogin handleLogin={handleLogin}/>}
        </div>
    )
}
