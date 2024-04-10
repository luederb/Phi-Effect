import "./FriendRequests.css";
import axios from "axios";
import {Logger} from "../../../Logger/Logger.tsx";
import {FriendRequest} from "../../../Types/FriendRequest.ts";
import UserCard from "../UserCard/UserCard.tsx";
import {useState} from "react";
import {User} from "../../../Types/User.ts";

type FriendRequestsProps = {
    receivedFriendRequests: FriendRequest[];
    handleSetReceivedFriendRequests: (value: FriendRequest[]) => void;
    sentFriendRequests: FriendRequest[];
    handleSetSentFriendRequests: (value: FriendRequest[]) => void;
    friends: User[];
}
export default function FriendRequests({
                                           receivedFriendRequests,
                                           handleSetReceivedFriendRequests,
                                           sentFriendRequests,
                                           handleSetSentFriendRequests,
                                           friends
                                       }: Readonly<FriendRequestsProps>) {
    const [expandedUserId, setExpandedUserId] = useState<string | null>(null);

    function onUserCardClick(id: string) {
        if (expandedUserId === id) {
            setExpandedUserId(null);
        } else {
            setExpandedUserId(id);
        }
    }

    function acceptFriendRequest(friendId: string, friendRequestId: string) {
        axios.put(`/api/users/${friendId}/friendRequests/${friendRequestId}/accept`)
            .then(response => {
                Logger.log("Friend request accepted: ", response.data)
                handleSetReceivedFriendRequests(receivedFriendRequests.find(request => request.id === friendRequestId) && response.data)
            })
            .catch(error => {
                Logger.error("Error accepting friend request: ", error)
            })
    }

    function rejectFriendRequest(friendId: string, friendRequestId: string) {
        axios.put(`/api/users/${friendId}/friendRequests/${friendRequestId}/reject`)
            .then(response => {
                Logger.log("Friend request rejected: ", response.data)
                handleSetSentFriendRequests(receivedFriendRequests.find(request => request.id === friendRequestId) && response.data)
            })
            .catch(error => {
                Logger.error("Error rejecting friend request: ", error)
            })
    }


    return (
        <div className="friend-request-list">
            {receivedFriendRequests && receivedFriendRequests.length > 0 && <>
                <h3>Received Friend Requests</h3>
                <ul className="friends-requests-list">
                    {receivedFriendRequests.map(receivedFriendRequest => (
                        <li key={receivedFriendRequest.id} className="friend-request">
                            <button onClick={() => onUserCardClick(receivedFriendRequest.sender.id)}>
                                <UserCard receivedFriendRequest={receivedFriendRequest}
                                          user={receivedFriendRequest.sender}
                                          isExpanded={receivedFriendRequest.sender.id === expandedUserId}
                                          isFriend={
                                              friends.some(friend => friend.id === receivedFriendRequest.sender.id)
                                          }/>
                            </button>
                            {receivedFriendRequest.status === "pending" &&
                                <>
                                    <button className="classic-button"
                                            onClick={() => rejectFriendRequest(receivedFriendRequest.receiver.id, receivedFriendRequest.id)}>reject
                                    </button>
                                    <button className="classic-button"
                                            onClick={() => acceptFriendRequest(receivedFriendRequest.receiver.id, receivedFriendRequest.id)}>accept
                                    </button>
                                </>
                            }
                            {receivedFriendRequest.status === "accepted" &&
                                <p>Accepted</p>
                            }
                            {receivedFriendRequest.status === "rejected" &&
                                <p>Rejected</p>
                            }
                        </li>
                    ))}
                </ul>
            </>
            }
            {sentFriendRequests && sentFriendRequests.length > 0 && <>
                <h3>Sent Friend Requests</h3>
                <ul className="friends-requests-list">
                    {sentFriendRequests.map(sentFriendRequest => (
                        <li key={sentFriendRequest.id} className="friend-request">
                            <button onClick={() => onUserCardClick(sentFriendRequest.sender.id)}>
                                <UserCard sentFriendRequest={sentFriendRequest}
                                          user={sentFriendRequest.receiver}
                                          isExpanded={sentFriendRequest.sender.id === expandedUserId}
                                          isFriend={
                                              friends.some(friend => friend.id === sentFriendRequest.receiver.id)
                                          }/>
                            </button>
                            {sentFriendRequest.status === "pending" &&
                                <>
                                    <button className="classic-button"
                                            onClick={() => acceptFriendRequest(sentFriendRequest.receiver.id, sentFriendRequest.id)}>accept
                                    </button>
                                    <button className="classic-button"
                                            onClick={() => rejectFriendRequest(sentFriendRequest.receiver.id, sentFriendRequest.id)}>reject
                                    </button>
                                </>
                            }
                            {sentFriendRequest.status === "accepted" &&
                                <p>Accepted</p>
                            }
                            {sentFriendRequest.status === "rejected" &&
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