import "./FriendRequests.css";
import axios from "axios";
import {Logger} from "../../../Logger/Logger.tsx";
import {FriendRequest} from "../../../Types/FriendRequest.ts";
import UserCard from "../UserCard/UserCard.tsx";
import {useEffect, useState} from "react";
import {User} from "../../../Types/User.ts";

type FriendRequestsProps = {
    friends: User[];
    sentFriendRequests: FriendRequest[];
    handleSetSendFriendRequests: (friendRequests: FriendRequest[]) => void;
    handleSendFriendRequest: (user: User) => void;
}
export default function FriendRequests({
                                           friends,
                                           sentFriendRequests,
                                           handleSetSendFriendRequests,
                                           handleSendFriendRequest
                                       }: Readonly<FriendRequestsProps>) {
    const currentUserId = localStorage.getItem("currentUserId");

    const [expandedUserId, setExpandedUserId] = useState<string | null>(null);
    const [receivedFriendRequests, setReceivedFriendRequests] = useState<FriendRequest[]>([]);

    function fetchSentFriendRequestsForCurrentUser() {
        axios.get(`/api/users/${currentUserId}/sentFriendRequestsForCurrentUser`)
            .then(response => {
                Logger.log("Sent Friend requests: ", response.data)
                if (typeof handleSetSendFriendRequests === "function") {
                    handleSetSendFriendRequests(sentFriendRequests ? [...sentFriendRequests, ...response.data] : [...response.data]);
                }
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
                handleSetSendFriendRequests(sentFriendRequests.filter(request => request.id !== friendRequestId))
                setReceivedFriendRequests(receivedFriendRequests.find(request => request.id === friendRequestId) && response.data)
            })
            .catch(error => {
                Logger.error("Error rejecting friend request: ", error)
            })
    }

    function onUserCardClick(id: string) {
        if (expandedUserId === id) {
            setExpandedUserId(null);
        } else {
            setExpandedUserId(id);
        }
    }

    useEffect(() => {
        fetchSentFriendRequestsForCurrentUser();
        fetchReceivedFriendRequestsForCurrentUser();
        // eslint-disable-next-line
    }, [])
    return (
        <div className="friend-request-list">
            {receivedFriendRequests && receivedFriendRequests.length > 0 &&
                <>
                    <h3>Received Friend Requests</h3>
                    <ul className="user-list">
                        {receivedFriendRequests.map(receivedFriendRequest => (
                            <li key={receivedFriendRequest.id}>
                                <UserCard receivedFriendRequest={receivedFriendRequest}
                                          user={receivedFriendRequest.sender}
                                          isExpanded={receivedFriendRequest.sender.id === expandedUserId}
                                          isFriend={
                                              friends ? friends.some(friend => friend.id === receivedFriendRequest.sender.id) : false
                                          }
                                          handleOnUserCardClick={onUserCardClick}
                                          handleAcceptFriendRequest={acceptFriendRequest}
                                          handleRejectFriendRequest={rejectFriendRequest}
                                          handleSendFriendRequest={handleSendFriendRequest}/>
                            </li>
                        ))}
                    </ul>
                </>
            }
            {sentFriendRequests && sentFriendRequests.length > 0 &&
                <>
                    <h3>Sent Friend Requests</h3>
                    <ul className="friends-requests-list">
                        {sentFriendRequests.map(sentFriendRequest => (
                            <li key={sentFriendRequest.id} className="friend-request">
                                <UserCard sentFriendRequest={sentFriendRequest}
                                          user={sentFriendRequest.receiver}
                                          isExpanded={sentFriendRequest.receiver.id === expandedUserId}
                                          isFriend={
                                              friends.some(friend => friend.id === sentFriendRequest.receiver.id)
                                          }
                                          handleOnUserCardClick={onUserCardClick}
                                          handleAcceptFriendRequest={acceptFriendRequest}
                                          handleRejectFriendRequest={rejectFriendRequest}
                                          handleSendFriendRequest={handleSendFriendRequest}/>
                            </li>
                        ))}
                    </ul>
                </>
            }
        </div>
    )
}