import "./FriendRequests.css";
import {useEffect, useState} from "react";
import axios from "axios";
import {Logger} from "../../../Logger/Logger.tsx";
import {FriendRequest} from "../../../Types/FriendRequest.ts";

export default function FriendRequests() {

    const currentUserId = localStorage.getItem("currentUserId");
    const [receivedFriendRequests, setReceivedFriendRequests] = useState<FriendRequest[]>([]);
    const [sentFriendRequests, setSentFriendRequests] = useState<FriendRequest[]>([]);

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

    function acceptFriendRequest(friendId: string, friendRequestId: string) {
        axios.put(`/api/users/${friendId}/friendRequests/${friendRequestId}/accept`)
            .then(response => {
                Logger.log("Friend request accepted: ", response.data)
                setReceivedFriendRequests(receivedFriendRequests.find(request => request.id === friendRequestId) && response.data)
            })
            .catch(error => {
                Logger.error("Error accepting friend request: ", error)
            })
    }

    function rejectFriendRequest(friendId: string, friendRequestId: string) {
        axios.put(`/api/users/${friendId}/friendRequests/${friendRequestId}/reject`)
            .then(response => {
                Logger.log("Friend request rejected: ", response.data)
                setReceivedFriendRequests(receivedFriendRequests.find(request => request.id === friendRequestId) && response.data)
            })
            .catch(error => {
                Logger.error("Error rejecting friend request: ", error)
            })
    }

    useEffect(() => {
        fetchSentFriendRequestsForCurrentUser();
        fetchReceivedFriendRequestsForCurrentUser();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="friend-request-list">
            {receivedFriendRequests.length > 0 &&
                <>
                    <h3>Received Friend Requests</h3>
                    <ul className="friends-requests-list">
                        {receivedFriendRequests.map(friendRequest => (
                            <li key={friendRequest.id} className="friend-request">
                                <p>{friendRequest.sender.name}</p>
                                {friendRequest.status === "pending" &&
                                    <>
                                        <button className="classic-button"
                                                onClick={() => acceptFriendRequest(friendRequest.receiver.id, friendRequest.id)}>accept
                                        </button>
                                        <button className="classic-button"
                                                onClick={() => rejectFriendRequest(friendRequest.receiver.id, friendRequest.id)}>reject
                                        </button>
                                    </>
                                }
                                {friendRequest.status === "accepted" &&
                                    <p>Accepted</p>
                                }
                                {friendRequest.status === "rejected" &&
                                    <p>Rejected</p>
                                }
                            </li>
                        ))}
                    </ul>
                </>
            }
            {sentFriendRequests.length > 0 &&
                <>
                    <h3>Sent Friend Requests</h3>
                    <ul className="friends-requests-list">
                        {sentFriendRequests.map(friendRequest => (
                            <li key={friendRequest.id} className="friend-request">
                                <p>{friendRequest.sender.name}</p>
                                {friendRequest.status === "pending" &&
                                    <>
                                        <button className="classic-button"
                                                onClick={() => acceptFriendRequest(friendRequest.receiver.id, friendRequest.id)}>accept
                                        </button>
                                        <button className="classic-button"
                                                onClick={() => rejectFriendRequest(friendRequest.receiver.id, friendRequest.id)}>reject
                                        </button>
                                    </>
                                }
                                {friendRequest.status === "accepted" &&
                                    <p>Accepted</p>
                                }
                                {friendRequest.status === "rejected" &&
                                    <p>Rejected</p>
                                }
                            </li>
                        ))}
                    </ul>
                </>
            }
        </div>
    )
}