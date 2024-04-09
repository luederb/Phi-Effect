import "./Network.css"
import {User} from "../../Types/User.ts";
import {useEffect, useState} from "react";
import axios from "axios";
import {Logger} from "../../Logger/Logger.tsx";
import UserCard from "./UserCard/UserCard.tsx";

export default function Network() {

    const [users, setUsers] = useState<User[]>([]);
    const [expandedUserId, setExpandedUserId] = useState<string | null>(null);
    function fetchAllUsers() {
        axios.get("/api/users")
            .then(response => {
                setUsers(response.data);
                Logger.log("Users: ", response.data);
            })
            .catch(error => {
                Logger.error("Error fetching users: ", error);
            })
    }

    function handleUserClick(id: string) {
        if (expandedUserId === id) {
            setExpandedUserId(null);
        } else {
            setExpandedUserId(id);
        }
    }

    useEffect(() => {
        fetchAllUsers();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="network-container">
            <h2>Network</h2>
            <p>connect to fellow film makers</p>
            <h3>List of all Users:</h3>
            <ul className="user-list">
                {users.map((user) => (
                    <li key={user.id}>
                        <UserCard user={user}
                                  onUserClick={handleUserClick}
                                  isExpanded={user.id === expandedUserId}/>
                    </li>
                ))}
            </ul>
        </div>
    )
}