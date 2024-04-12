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

    const [userIsLoggedIn, setUserIsLoggedIn] = useState<boolean>(false);
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
        fetch('/api/users/user/loggedIn')
            .then(response => response.json())
            .then(isLoggedIn => {
                if (isLoggedIn) {
                    setUserIsLoggedIn(true);
                    Logger.log("User is logged in.");
                } else {
                    setUserIsLoggedIn(false);
                    Logger.log("User is logged out.");
                }
            })
            .catch(error => Logger.error('Error while checking if user is logged in:', error));
    }

    function loadUser() {
        axios.get("/api/users/me", {
            headers: {
                'Authorization': `Bearer ${currentUserId}`
            }
        })
            .then(response => {
                response.data.newUser = false;
                setUserData(response.data)
                setUserIsLoggedIn(true)
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

    useEffect(() => {
        if(userIsLoggedIn) {
            loadUser();
            fetchReceivedFriendRequestsForCurrentUser()
        }
        // eslint-disable-next-line
    }, [userIsLoggedIn]);

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
