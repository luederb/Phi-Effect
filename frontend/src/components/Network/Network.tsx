import "./Network.css"
import {User} from "../../Types/User.ts";
import {useEffect, useState} from "react";
import axios from "axios";
import {Logger} from "../../Logger/Logger.tsx";
import UserCard from "./UserCard/UserCard.tsx";
import FriendRequests from "./FriendRequests/FriendRequests.tsx";
import {FriendRequest} from "../../Types/FriendRequest.ts";
import AllUsersList from "./AllUsersList/AllUsersList.tsx";

export default function Network() {
    const currentUserId = localStorage.getItem("currentUserId");

    const [users, setUsers] = useState<User[]>([]);
    const [currentUser, setCurrentUser] = useState<User>({} as User);
    const [expandedUserId, setExpandedUserId] = useState<string | null>(null);
    const [friends, setFriends] = useState<User[]>([]);
    const [receivedFriendRequests, setReceivedFriendRequests] = useState<FriendRequest[]>([]);
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

    function fetchSentFriendRequestsForCurrentUser() {
        axios.get(`/api/users/${currentUserId}/sentFriendRequestsForCurrentUser`)
            .then(response => {
                Logger.log("Sent Friend requests: ", response.data)
                setSentFriendRequests([...sentFriendRequests, ...response.data]);
            })
            .catch(error => {
                Logger.error("Error fetching friend requests: ", error);
            })
    }

    function fetchReceivedFriendRequestsForCurrentUser() {
        axios.get(`/api/users/${currentUserId}/receivedFriendRequestsForCurrentUser`)
            .then(response => {
                Logger.log("Received Friend requests: ", response.data)
                setReceivedFriendRequests([...receivedFriendRequests, ...response.data]);
            })
            .catch(error => {
                Logger.error("Error fetching friend requests: ", error);
            })
    }

    function onUserCardClick(id: string) {
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
        fetchSentFriendRequestsForCurrentUser();
        fetchReceivedFriendRequestsForCurrentUser();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="network-container">
            <h2>Network</h2>
            <p>connect to fellow film makers</p>
            <FriendRequests
                sentFriendRequests={sentFriendRequests}
                receivedFriendRequests={receivedFriendRequests}
                handleSetReceivedFriendRequests={setReceivedFriendRequests}
                handleSetSentFriendRequests={setSentFriendRequests}
                friends={friends}
            />

            <h3>List of all Friends:</h3>
            <ul className="user-list">
                {friends.length === 0 ?
                    <p>You have no friends</p>
                    :
                    friends.map(friend => (
                        <li key={friend.id}>
                            <button onClick={() => onUserCardClick(friend.id)}>
                                <UserCard user={friend}
                                          isExpanded={friend.id === expandedUserId}
                                          handleRemoveFriend={removeFriend}
                                          isFriend={
                                              friends.some(friend => friend.id === currentUserId)
                                          }
                                />
                            </button>
                        </li>
                    ))}
            </ul>
            <h3>List of all Users:</h3>
            <AllUsersList users={users}
                          currentUserId={currentUserId}
                          friends={friends}
                          sendFriendRequest={sendFriendRequest}
                          removeFriend={removeFriend}/>

        </div>
    )
}