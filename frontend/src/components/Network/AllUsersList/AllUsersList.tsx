import UserCard from "../UserCard/UserCard.tsx";
import {User} from "../../../Types/User.ts";
import {useEffect, useState} from "react";
import {FriendRequest} from "../../../Types/FriendRequest.ts";
import {
    fetchAllUsers,
    fetchFriends,
    fetchReceivedFriendRequestsForCurrentUser, fetchSentFriendRequestsForCurrentUser
} from "../../../Utils/API/ApiFunctions.ts";
import axios from "axios";
import {Logger} from "../../../Logger/Logger.tsx";


export default function AllUsersList() {
    const currentUserId = localStorage.getItem("currentUserId");
    const [expandedUserId, setExpandedUserId] = useState<string | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [currentUser, setCurrentUser] = useState<User>({} as User);
    const [friends, setFriends] = useState<User[]>([]);
    const [sentFriendRequests, setSentFriendRequests] = useState<FriendRequest[]>([]);
    const [receivedFriendRequests, setReceivedFriendRequests] = useState<FriendRequest[]>([]);

    function onUserCardClick(id: string) {
        if (expandedUserId === id) {
            setExpandedUserId(null);
        } else {
            setExpandedUserId(id);
        }
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

    useEffect(() => {
        if (currentUserId) {
            fetchAllUsers(setUsers, currentUser, setCurrentUser, currentUserId)
            fetchFriends(currentUserId, setFriends)
            fetchSentFriendRequestsForCurrentUser(currentUserId, setSentFriendRequests)
            fetchReceivedFriendRequestsForCurrentUser(currentUserId, setReceivedFriendRequests)
        }
        // eslint-disable-next-line
    }, [currentUserId]);

    return (
        <ul className="user-list">
            {users.map((user) => (
                user.id !== currentUserId &&
                <li key={user.id}>
                    <div className="user-card-content">
                        <UserCard user={user}
                                  handleOnUserCardClick={onUserCardClick}
                                  isExpanded={user.id === expandedUserId}
                                  receivedFriendRequest={receivedFriendRequests.find(request => request.sender.id === user.id)}
                                  isFriend={!!friends.find(friend => friend.id === user.id)}
                                  handleRemoveFriend={removeFriend}
                                  handleSendFriendRequest={sendFriendRequest}
                        />
                    </div>
                </li>
            ))}
        </ul>
    )
}