import "./Home.css";

import HomeWithoutLogin from "./HomeWithoutLogin/HomeWithoutLogin";
import axios from "axios";
import {useEffect, useState} from "react";
import {User} from "../../Types/User.ts";
import ProjectsOverviewTable from "../ProjectsOverviewTable/ProjectsOverviewTable.tsx";
import FriendRequests from "../FriendRequests/FriendRequests.tsx";
import {Logger} from "../../Logger/Logger.tsx";

type HomeProps = {
    setCurrentUserId: (id: string) => void;
}
export default function Home({setCurrentUserId}: Readonly<HomeProps>){

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
                setCurrentUserId(response.data.id);
                Logger.log("User data loaded:", response.data);
            })
            .catch((error) => {
                Logger.error("An error occurred while loading user data:", error);
            });
    }

    useEffect(() => {
        loadUser();
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
                <HomeWithoutLogin/>}
        </div>
    )
}
