import "./FriendRequests.css";
import axios from "axios";
import {Logger} from "../../../Logger/Logger.tsx";
import {FriendRequest} from "../../../Types/FriendRequest.ts";
import UserCard from "../UserCard/UserCard.tsx";
import {useEffect, useState} from "react";
import {User} from "../../../Types/User.ts";
import {
    fetchFriends,
    fetchReceivedFriendRequestsForCurrentUser,
    fetchSentFriendRequestsForCurrentUser
} from "../../../Utils/API/ApiFunctions.ts";

export default function FriendRequests() {
    const currentUserId = localStorage.getItem("currentUserId");
    const [expandedUserId, setExpandedUserId] = useState<string | null>(null);
    const [friends, setFriends] = useState<User[]>([]);
    const [sentFriendRequests, setSentFriendRequests] = useState<FriendRequest[]>([]);
    const [receivedFriendRequests, setReceivedFriendRequests] = useState<FriendRequest[]>([]);

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
                setSentFriendRequests(sentFriendRequests.filter(request => request.id !== friendRequestId))
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
        if (currentUserId) {
            fetchFriends(currentUserId, setFriends)
            fetchSentFriendRequestsForCurrentUser(currentUserId, setSentFriendRequests)
            fetchReceivedFriendRequestsForCurrentUser(currentUserId, setReceivedFriendRequests)
        }
        // eslint-disable-next-line
    }, []);

    return (
        <div className="friend-request-list-container">
            {receivedFriendRequests && receivedFriendRequests.length > 0 &&
                <>
                    <h3 className="friend-requests-headline">Received Friend Requests</h3>
                    <ul className="user-list">
                        {receivedFriendRequests.map(receivedFriendRequest => (
                            <li key={receivedFriendRequest.id}>
                                <div className="friend-request-list">
                                    <UserCard receivedFriendRequest={receivedFriendRequest}
                                              user={receivedFriendRequest.sender}
                                              isExpanded={receivedFriendRequest.sender.id === expandedUserId}
                                              isFriend={
                                                  friends.length > 0 ? friends.some(friend => friend.id === receivedFriendRequest.sender.id) : false
                                              }
                                              handleOnUserCardClick={onUserCardClick}
                                              handleAcceptFriendRequest={acceptFriendRequest}
                                              handleRejectFriendRequest={rejectFriendRequest}
                                    />
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            }
            {sentFriendRequests && sentFriendRequests.length > 0 &&
                <>
                    <h3>Sent Friend Requests</h3>
                    <ul className="user-list">
                        {sentFriendRequests.map(sentFriendRequest => (
                            <li key={sentFriendRequest.id}>
                                <div className="friend-request-list">
                                <UserCard sentFriendRequest={sentFriendRequest}
                                          user={sentFriendRequest.receiver}
                                          isExpanded={sentFriendRequest.receiver.id === expandedUserId}
                                          isFriend={
                                              friends.some(friend => friend.id === sentFriendRequest.receiver.id)
                                          }
                                          handleOnUserCardClick={onUserCardClick}
                                          handleAcceptFriendRequest={acceptFriendRequest}
                                          handleRejectFriendRequest={rejectFriendRequest}/>
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            }
        </div>
    )
}