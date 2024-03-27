import "./Profile.css";
import {User} from "../../Types/User.ts";
import {useEffect, useState} from "react";
import axios from "axios";
import {Logger} from "../../Logger/Logger.tsx";


type ProfileProps = {
    currentUserId: string;
}
export default function Profile({currentUserId}: Readonly<ProfileProps>) {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<User>({
        id: "",
        name: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: 0,
        bio: "",
        picture: "",
    });

    function fetchUserData() {
        setIsLoading(true);
        axios.get(`/api/users/${currentUserId}`)
            .then(response => {
                setUser(response.data)
                Logger.log("User: ", response.data)
            })
            .catch(error => Logger.log("Error fetching data: ", error))
            .finally(() => setIsLoading(false))
    }

    useEffect(() => {
        fetchUserData();
    }, []);

    if (isLoading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }
    if (!user) {
        return (
            <div>
                <h1>User not found</h1>
            </div>
        )

    }
    return (
        <div>
            <div className="profile">
                    <div className="name-and-avatar">
                        <h2>{user.name}</h2>
                        <img className="avatar" src={user.picture} alt="avatar"/>
                    </div>
                <div className="profile-data">
                    <div className="profile-element">
                        <p>First Name: </p>
                        <p>{user.firstName}</p>
                    </div>
                    <div className="profile-element">
                        <p>Last Name: </p>
                        <p>{user.lastName}</p>
                    </div>
                    <div className="profile-element">
                        <p>E-Mail: </p>
                        <p>{user.email}</p>
                    </div>
                    <div className="profile-element">
                        <p>Phone: </p>
                        <p>0{user.phone}</p>
                    </div>
                    <div className="profile-element">
                        <p>Bio: </p>
                        <p>{user.bio}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}