import "./Network.css"
import {User} from "../../Types/User.ts";
import {useEffect, useState} from "react";
import axios from "axios";
import {Logger} from "../../Logger/Logger.tsx";
import UserCard from "./UserCard/UserCard.tsx";
import FriendRequests from "./FriendRequests/FriendRequests.tsx";

export default function Network() {
    const currentUserId = localStorage.getItem("currentUserId");

    const [users, setUsers] = useState<User[]>([]);
    const [currentUser, setCurrentUser] = useState<User>({} as User);
    const [expandedUserId, setExpandedUserId] = useState<string | null>(null);
    const [friends, setFriends] = useState<User[]>([]);

    function fetchAllUsers() {
        axios.get("/api/users")
            .then(response => {
                setUsers(response.data);
                setCurrentUser(response.data.find((user: { id: string | null; }) => user.id === currentUserId));
                Logger.log("Users: ", response.data);
                Logger.log("Current User: ", currentUser);
            })
            .catch(error => {
                Logger.error("Error fetching users: ", error);
            })
    }
    function fetchFriends() {
        axios.get(`/api/users/${currentUserId}/friends`)
            .then(response => {
                Logger.log("Friends: ", response.data)
                setFriends(response.data);
            })
            .catch(error => {
                Logger.error("Error fetching friends: ", error);
            })
    }

    function onUserClick(id: string) {
        if (expandedUserId === id) {
            setExpandedUserId(null);
        } else {
            setExpandedUserId(id);
        }
    }

    function sendFriendRequest(sender: User) {
        axios.post(`/api/users/${currentUserId}/friendRequests`, sender)
            .then(response => {
                Logger.log("Friend request sent: ", response.data);
            })
            .catch(error => {
                Logger.error("Error sending friend request: ", error);
            })

    }

    useEffect(() => {
        fetchAllUsers();
        fetchFriends();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="network-container">
            <h2>Network</h2>
            <p>connect to fellow film makers</p>

            <FriendRequests/>

            <h3>List of all Friends:</h3>
            <ul className="user-list">
                {friends.length === 0 ?
                    <p>You have no friends</p>
                    :
                friends.map(friend => (
                    <li key={friend.id}>
                        <UserCard user={friend}
                                  handleOnUserClick={onUserClick}
                                  isExpanded={friend.id === expandedUserId}
                                  isFriend={true}
                        />
                    </li>
                ))}
            </ul>
            <h3>List of all Users:</h3>
            <ul className="user-list">
                {users.map((user) => (
                    user.id !== currentUserId &&
                    <li key={user.id}>
                        <UserCard user={user}
                                  handleOnUserClick={onUserClick}
                                  isExpanded={user.id === expandedUserId}
                        handleSendFriendRequest={sendFriendRequest}
                        isFriend={
                            friends.some(friend => friend.id === user.id)
                        }/>
                    </li>
                ))}
            </ul>
        </div>
    )
}