import "./CompleteProfile.css";
import {Logger} from "../../Logger/Logger.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {User} from "../../Types/User.ts";
import React, {useEffect, useState} from "react";
import axios from "axios";


export default function CompleteProfile() {
    const navigate = useNavigate();

    function navigateToHomepage() {
        navigate("/");
    }

    const params = useParams();
    const id: string | undefined = params.id;

    const [googleUserData, setGoogleUserData] = useState<User>({
        id: "",
        name: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: 0,
        bio: "",
        picture: "",
    });
    const [isLoading, setIsLoading] = useState(true);

    function fetchUserData() {
        setIsLoading(true);
        axios.get(`/api/users/${id}`)
            .then(response => {
                setGoogleUserData(response.data)
                Logger.log("GoogleUserData: ", response.data)
            })
            .catch(error => Logger.log("Error fetching data: ", error))
            .finally(() => setIsLoading(false))
    }

    function onProfilDataInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setGoogleUserData({
            ...googleUserData, [e.target.name]: e.target.value
        })
        Logger.log("GoogleUserData: ", googleUserData)
    }

    function updateUserData() {
        axios.put(`/api/users/${id}`, googleUserData)
            .then(response => {
                Logger.log("Response: ", response.data);
                navigateToHomepage();
            })
            .catch(error => Logger.log("Error fetching data: ", error))

    }

    useEffect(() => {
        fetchUserData();
    }, []);


    if (isLoading) {
        return <div>Loading profile...</div>;
    }
    if (!googleUserData) {
        return <p>No user data available.</p>
    }
    return (
        <div className="complete-profile-page">
            <div className="complete-profile-with-avatar">
                <h2>Welcome {googleUserData.name}</h2>
                <img src={googleUserData.picture} alt="profile avatar" className="user-avatar"/>
            </div>
            <form className="complete-profile-form">
                <div className="label-with-input-field">
                    <label htmlFor="firstName">First Name:</label>
                    <input type="text" id="firstName" name="firstName" value={googleUserData.firstName}
                           onChange={onProfilDataInputChange}/>
                </div>
                <div className="label-with-input-field">
                    <label htmlFor="lastName">Last Name:</label>
                    <input type="text" id="lastName" name="lastName" value={googleUserData.lastName}
                           onChange={onProfilDataInputChange}/>
                </div>
                <div className="label-with-input-field">
                    <label htmlFor="email">E-Mail:</label>
                    <input type="email" id="email" name="email" value={googleUserData.email}
                           onChange={onProfilDataInputChange}/>
                </div>
                <div className="label-with-input-field">
                    <label htmlFor="phone">Phone:</label>
                    <input type="tel" id="phone" name="phone" placeholder="enter your phone number"
                           value={googleUserData.phone === 0 ? undefined : googleUserData.phone} onChange={onProfilDataInputChange}/>
                </div>
                <div className="label-with-input-field">
                    <label htmlFor="bio">Bio:</label>
                    <textarea id="bio" name="bio" placeholder="Tell us something about yourself..."
                              value={googleUserData.bio} onChange={onProfilDataInputChange}/>
                </div>
            </form>
            <button className="submit-button" onClick={updateUserData}>Submit</button>

        </div>
    )
}