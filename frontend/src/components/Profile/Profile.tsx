import "./Profile.css";
import {User} from "../../Types/User.ts";
import {useEffect, useState} from "react";
import axios from "axios";
import {Logger} from "../../Logger/Logger.tsx";
import {useNavigate} from "react-router-dom";
import EditProfileForm from "./EditProfileForm/EditProfileForm.tsx";


type ProfileProps = {
    handleLogin: () => void;
}
export default function Profile({handleLogin}: Readonly<ProfileProps>) {

    const navigate = useNavigate();
    const currentUserId = localStorage.getItem("currentUserId");

    const [isLoading, setIsLoading] = useState(true);
    const [editUserData, setEditUserData] = useState(false);
    const [userExists, setUserExists] = useState(true);
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
                setUser(response.data);
                setUserExists(true);
                Logger.log("User: ", response.data);
            })
            .catch(error => {
                Logger.log("Error fetching data: ", error);

            })
            .finally(() => setIsLoading(false))
    }

    function updateUserData(updatedUser: User) {
        axios.put(`/api/users/${currentUserId}`, updatedUser)
            .then(response => {
                setUser(updatedUser);
                setEditUserData(false);
                Logger.log("User updated: ", response.data)
            })
            .catch(error => Logger.log("Error updating user: ", error));
    }

    function deleteUserData() {
        axios.delete(`/api/users/${currentUserId}`)
            .then(response => {
                Logger.log("User deleted: ", response.data)
                logout();
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
                setUserExists(false);
            })
            .catch(error => Logger.log("Error deleting user: ", error))
    }

    function logout() {
        axios.get("/api/users/logout")
            .then(() => {
                Logger.log("Logout successful");
                localStorage.clear();
                navigate("/");
            })
            .catch((error) => {
                Logger.error("Logout failed:", error);
            });
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

    if (!userExists) {
        return (
            <div className="profile-without-login">
                <p>You don't have a profile, yet. Please sign in to view your profile</p>
                <div>
                    <button onClick={handleLogin}>Login</button>
                </div>
            </div>
        )
    }

    if (user.id === "") {
        return (
            <div className="profile-without-login">
                <p>Please log in to view your profile</p>
                <div>
                    <button onClick={handleLogin}>Login</button>
                </div>
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
                    {editUserData ?
                        <EditProfileForm user={user} handleUpdateUserData={updateUserData}/>
                        :
                        <>
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
                            <div className="profile-buttons">
                                <button onClick={logout}>Logout
                                </button>
                                <button onClick={() => setEditUserData(true)}>Edit Profile</button>
                                <button onClick={deleteUserData}>Delete Profile</button>
                            </div>
                        </>}
                </div>
            </div>
        </div>
    )
        ;
}