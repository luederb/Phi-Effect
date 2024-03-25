import "./Home.css";

import HomeWithoutLogin from "./HomeWithoutLogin/HomeWithoutLogin";
import axios from "axios";
import {useEffect, useState} from "react";
import {User} from "../../Types/User.ts";

export default function Home() {
    const [userData, setUserData] = useState<User>({
        id: "",
        name: "",
        givenName: "",
        familyName: "",
        email: "",
        picture: ""
    });

    function loadUser() {
        axios.get('/api/users/me')
            .then(response => {
                setUserData(response.data)
                console.log("User data loaded:", response.data);
            })
            .catch((error) => {
                console.error("An error occurred while loading user data:", error);
            });
    }

    useEffect(() => {
        loadUser();
    }, []);

    return (
        <div className="home-container">
            {userData.name ?
                <>
                    <h2>Welcome Lüder</h2>
                    <p>Your upcoming events are:</p>
                    <button>Logout</button>
                </>
                :
                <HomeWithoutLogin/>}
        </div>
    )
}
