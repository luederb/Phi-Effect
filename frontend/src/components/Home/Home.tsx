import "./Home.css";

import HomeWithoutLogin from "./HomeWithoutLogin/HomeWithoutLogin";
import axios from "axios";
import {useEffect, useState} from "react";
import {User} from "../../Types/User.ts";
import ProjectsOverviewTable from "./ProjectsOverviewTable/ProjectsOverviewTable.tsx";
import {Logger} from "../../Logger/Logger.tsx";
import {FriendRequest} from "../../Types/FriendRequest.ts";

type HomeProps = {
    handleLogin: () => void

}
export default function Home({handleLogin}: Readonly<HomeProps>) {

    const currentUserId = localStorage.getItem("currentUserId");

    const [userData, setUserData] = useState<User>({
        id: "",
        name: "",
        firstName: "",
        lastName: "",
        email: "",
        picture: ""
    });
    const [receivedFriendRequests, setReceivedFriendRequests] = useState<FriendRequest[]>([]);

    function checkIfUserIsLoggedIn() {
        fetch("/api/users/checkIfLoggedIn", {
            headers: {
                'Authorization': `Bearer ${currentUserId}`
            }
        })
            .then(response => response.json())
            .then(isLoggedIn => {
                if (isLoggedIn) {
                    loadUser()
                    fetchReceivedFriendRequestsForCurrentUser()
                    Logger.log("User is logged in.");
                } else {
                    Logger.log("User is logged out.");
                }
            })
            .catch(error => Logger.error("Error while checking if user is logged in:", error));
    }

    function loadUser() {
        axios.get("/api/users/me", {
            headers: {
                "Authorization": `Bearer ${currentUserId}`
            }
        })
            .then(response => {
                response.data.newUser = false;
                setUserData(response.data)
                localStorage.setItem("currentUserId", response.data.id)
                Logger.log("User data loaded:", response.data);
            })
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    Logger.log("Unauthorized. Clearing user ID from local storage.");
                    localStorage.removeItem("currentUserId");
                } else {
                    Logger.error("An error occurred while loading user data:", error);
                }
            });
    }

    function fetchReceivedFriendRequestsForCurrentUser() {
        axios.get(`/api/users/${currentUserId}/receivedFriendRequestsForCurrentUser`)
            .then(response => {
                Logger.log("Received Friend requests: ", response.data)
                setReceivedFriendRequests([...receivedFriendRequests, ...response.data]);
            })
            .catch(error => {
                Logger.error("Error fetching friend requests: ", error);
            })
    }

    useEffect(() => {
        checkIfUserIsLoggedIn();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="home-container">
            {userData.name ?
                <>
                    <h2>Welcome, {userData.firstName}</h2>
                    <ProjectsOverviewTable/>

                </>
                :
                <HomeWithoutLogin handleLogin={handleLogin}/>}
        </div>
    )
}
