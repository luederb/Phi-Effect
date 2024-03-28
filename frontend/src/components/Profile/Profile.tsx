import "./Profile.css";
import {User} from "../../Types/User.ts";
import {useEffect, useState} from "react";
import axios from "axios";
import {Logger} from "../../Logger/Logger.tsx";
import {useNavigate} from "react-router-dom";


type ProfileProps = {
    currentUserId: string;
    setCurrentUserId: (id: string) => void;
    handleLogin: () => void;
}
export default function Profile({currentUserId, setCurrentUserId, handleLogin}: Readonly<ProfileProps>) {

    const navigate = useNavigate();

    function navigateToHomepage() {
        navigate("/");
    }

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

    function deleteUserData() {
        axios.delete(`/api/users/${currentUserId}`)
            .then(response => {
                Logger.log("User deleted: ", response.data)
                setUser({
                    id: "",
                    name: "",
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: 0,
                    bio: "",
                    picture: ""
                })
                setCurrentUserId("");
            })
            .catch(error => Logger.log("Error deleting user: ", error))
    }

    const handleLogout = () => {
        axios.get("/api/users/logout")
            .then(() => {
                Logger.log("Logout successful");
                setCurrentUserId("");
                navigateToHomepage();
            })
            .catch((error) => {
                Logger.error("Logout failed:", error);
            });
    };

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
    if (!user) {
        return (
            <div>
                <h1>User not found</h1>
            </div>
        )

    }
    return (
        <>
            {currentUserId === "" ?
                <div className="profile-without-login">
                    <p>Please log in to view your profile</p>
                    <div>
                        <button onClick={handleLogin}>Login</button>
                    </div>
                </div>
                :
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
                        <div className="profile-buttons">
                            <button onClick={handleLogout}>Logout</button>
                            <button onClick={deleteUserData}>Delete Profile</button>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}