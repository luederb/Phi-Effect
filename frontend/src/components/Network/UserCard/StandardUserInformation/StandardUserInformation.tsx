import "./StandardUserInformation.css";
import {User} from "../../../../Types/User.ts";

type StandardUserInformationProps = {
    user: User;

}
export default function StandardUserInformation({user}: Readonly<StandardUserInformationProps>) {
    return (
        <>
            <div className="user-card-line">
                <p>Email: </p>
                <p>{user.email}</p>
            </div>
            {user.phone !== 0 &&
                <div className="user-card-line">
                    <p>Phone: </p>
                    <p className="phone-number">{`0${user.phone?.toString().slice(0, 3)}  -  ${user.phone?.toString().slice(3, 5)} ${user.phone?.toString().slice(5, 7)} ${user.phone?.toString().slice(7, 9)} ${user.phone?.toString().slice(9)}`}</p>
                </div>}
            {user.bio !== "" &&
                <div className="user-card-line">
                    <p>Bio: </p>
                    <p>{user.bio}</p>
                </div>}
            {user.favoriteProjects?.entries() &&
                <div className="user-card-line">
                    <p>Favorite Projects: </p>
                    <p>{user.favoriteProjects}</p>
                </div>}
        </>
    )
}