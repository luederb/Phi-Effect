import "./FriendRequests.css";
import {Link} from "react-router-dom";
import {User} from "../../../Types/User.ts";
import {useEffect, useState} from "react";

export default function FriendRequests() {
    const [friendRequests, setFriendRequests] = useState<User[]>([]);

    function fetchFriendRequests() {
        setFriendRequests(
            [
                {
                    id: "1",
                    name: "Lüder Budde",
                    firstName: "Lüder",
                    lastName: "Budde",
                    email: "lueder.budde@gmail.com",
                    picture: ""
                },
                {
                    id: "2",
                    name: "Marion Frischeisen",
                    firstName: "Marion",
                    lastName: "Frischeisen",
                    email: "m.frischeisen@gmail.com",
                    picture: ""
                }]
        )
    }

    useEffect(() => {
        fetchFriendRequests();
    }, []);

    return (
        <div className="friend-request-list">
            <h3>Friend Requests</h3>
            {friendRequests.length === 0 ?
                <p>You have no friend requests</p>
                :
                <ul className="friends-requests-list">
                    {friendRequests.map(friendRequest => (
                        <li key={friendRequest.id} className="friend-request">
                            <p>{friendRequest.name}</p>
                            <Link to="/network" className="link-as-button">view request</Link>
                        </li>
                    ))}
                </ul>
            }
        </div>
    )
}