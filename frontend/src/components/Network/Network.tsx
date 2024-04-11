import "./Network.css"
import {User} from "../../Types/User.ts";
import {useEffect, useState} from "react";
import axios from "axios";
import {Logger} from "../../Logger/Logger.tsx";
import UserCard from "./UserCard/UserCard.tsx";
import FriendRequests from "./FriendRequests/FriendRequests.tsx";
import AllUsersList from "./AllUsersList/AllUsersList.tsx";
import {FriendRequest} from "../../Types/FriendRequest.ts";

export default function Network() {
    const currentUserId = localStorage.getItem("currentUserId");

    const [users, setUsers] = useState<User[]>([]);
    const [currentUser, setCurrentUser] = useState<User>({} as User);
    const [expandedUserId, setExpandedUserId] = useState<string | null>(null);
    const [friends, setFriends] = useState<User[]>([]);
    const [sentFriendRequests, setSentFriendRequests] = useState<FriendRequest[]>([]);

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

    function onUserCardClick(id: string) {
        if (expandedUserId === id) {
            setExpandedUserId(null);
        } else {
            setExpandedUserId(id);
        }
    }

    function sendFriendRequest(receiver: User) {
        const existingPendingRequest = sentFriendRequests.find(request =>
            request.receiver.id === receiver.id &&
            request.sender.id === currentUserId &&
            request.status === "PENDING");
        if (existingPendingRequest) {
            Logger.log("Friend request already exists and is pending: ", existingPendingRequest);
            return;
        }
        axios.post(`/api/users/${currentUserId}/friendRequests`, receiver)
            .then(response => {
                Logger.log("Friend request sent: ", response.data);
                setSentFriendRequests([...sentFriendRequests, response.data]);
            })
            .catch(error => {
                Logger.error("Error sending friend request: ", error);
            })
    }

    function removeFriend(friendId: string) {
        axios.delete(`/api/users/${currentUserId}/friends/${friendId}`)
            .then(response => {
                Logger.log("Friend removed: ", response.data);
                setFriends(friends.filter(friend => friend.id !== friendId));
            })
            .catch(error => {
                Logger.error("Error removing friend: ", error);
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
            <FriendRequests friends={friends} sentFriendRequests={sentFriendRequests}
                            handleSetSendFriendRequests={setSentFriendRequests}
                            handleSendFriendRequest={sendFriendRequest}/>
            <h3>List of all Friends:</h3>
            <ul className="user-list">
                {friends.length === 0 ?
                    <p>You have no friends</p>
                    :
                    friends.map(friend => (
                        <li key={friend.id}>
                            <UserCard user={friend}
                                      isExpanded={friend.id === expandedUserId}
                                      handleRemoveFriend={removeFriend}
                                      isFriend={true}
                                      handleOnUserCardClick={onUserCardClick}
                            />
                        </li>
                    ))}
            </ul>
            <h3>List of all Users:</h3>
            <AllUsersList users={users}
                          currentUserId={currentUserId}
                          friends={friends}
                          removeFriend={removeFriend}
                          handleSendFriendRequest={sendFriendRequest}/>
        </div>
    )
}