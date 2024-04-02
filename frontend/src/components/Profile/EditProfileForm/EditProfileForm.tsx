import "./EditProfileForm.css";
import React, {useState} from "react";
import {User} from "../../../Types/User.ts";

type EditProfileFormProps = {
    user: User;
    handleUpdateUserData: (updatedUser: User) => void;
}
export default function EditProfileForm({handleUpdateUserData, user}: Readonly<EditProfileFormProps>) {

    const [currentUserData, setCurrentUserData] = useState<User>({
        id: user.id,
        name: user.name,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        bio: user.bio,
        picture: user.picture
    });

    function onProfilDataInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setCurrentUserData({
            ...currentUserData, [e.target.name]: e.target.value
        })
    }

    return (
        <div className="profile-data">
            <form className="edit-profile-data-form">
                <div className="label-with-input-field">
                    <label htmlFor="firstName">First Name:</label>
                    <input type="text" id="firstName" name="firstName" value={currentUserData.firstName}
                           onChange={onProfilDataInputChange}/>
                </div>
                <div className="label-with-input-field">
                    <label htmlFor="lastName">Last Name:</label>
                    <input type="text" id="lastName" name="lastName" value={currentUserData.lastName}
                           onChange={onProfilDataInputChange}/>
                </div>
                <div className="label-with-input-field">
                    <label htmlFor="email">E-Mail:</label>
                    <input type="email" id="email" name="email" value={currentUserData.email}
                           onChange={onProfilDataInputChange}/>
                </div>
                <div className="label-with-input-field">
                    <label htmlFor="phone">Phone:</label>
                    <input type="tel" id="phone" name="phone" placeholder="enter your phone number"
                           value={currentUserData.phone === 0 ? undefined : currentUserData.phone}
                           onChange={onProfilDataInputChange}/>
                </div>
                <div className="label-with-input-field">
                    <label htmlFor="bio">Bio:</label>
                    <textarea id="bio" name="bio" placeholder="Tell us something about yourself..."
                              value={currentUserData.bio} onChange={onProfilDataInputChange}/>
                </div>
            </form>
            <button className="profile-buttons" onClick={() => handleUpdateUserData(currentUserData)}>Update</button>
        </div>
    )
}