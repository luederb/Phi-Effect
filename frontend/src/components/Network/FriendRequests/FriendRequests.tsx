import "./FriendRequests.css";
import {useEffect, useState} from "react";
import axios from "axios";
import {Logger} from "../../../Logger/Logger.tsx";
import {FriendRequest} from "../../../Types/FriendRequest.ts";

export default function FriendRequests() {

    const currentUserId = localStorage.getItem("currentUserId");

    const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);

    function fetchFriendRequests() {
        axios.get(`/api/users/${currentUserId}/pendingFriendRequests`)
            .then(response => {
                Logger.log("Friend requests: ", response.data)
                setFriendRequests(response.data);
            })
            .catch(error => {
                Logger.error("Error fetching friend requests: ", error);
            })
    }

    function acceptFriendRequest(friendId: string, friendRequestId: string) {
        axios.put(`/api/users/${friendId}/friendRequests/${friendRequestId}/accept`)
            .then(response => {
                Logger.log("Friend request accepted: ", response.data)
                setFriendRequests(friendRequests.filter(request => request.id !== friendRequestId))
            })
            .catch(error => {
                Logger.error("Error accepting friend request: ", error)
            })
    }

    useEffect(() => {
        fetchFriendRequests();
        // eslint-disable-next-line
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
                            <p>{friendRequest.sender.name}</p>
                            <button className="classic-button" onClick={() => acceptFriendRequest(friendRequest.receiver.id, friendRequest.id)}>accept </button>
                        </li>
                    ))}
                </ul>
            }
        </div>
    )
}