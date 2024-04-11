import "./UserCard.css";
import {User} from "../../../Types/User.ts";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {Logger} from "../../../Logger/Logger.tsx";
import {FriendRequest} from "../../../Types/FriendRequest.ts";
import StandardUserInformation from "./StandardUserInformation/StandardUserInformation.tsx";
import UserCardHeader from "./UserCardHeader/UserCardHeader.tsx";

type UserCardProps = {
    user: User;
    receivedFriendRequest?: FriendRequest;
    sentFriendRequest?: FriendRequest;
    isExpanded: boolean;
    handleSendFriendRequest?: (friend: User) => void;
    handleRemoveFriend?: (friendId: string) => void;
    isFriend?: boolean;
    handleOnUserCardClick: (id: string) => void;
}
export default function UserCard({
                                     user,
                                     receivedFriendRequest,
                                     isExpanded,
                                     handleSendFriendRequest,
                                     handleRemoveFriend,
                                     isFriend,
                                     handleOnUserCardClick
                                 }: Readonly<UserCardProps>) {

    const currentUserId = localStorage.getItem("currentUserId");

    const cardRef = useRef<HTMLButtonElement>(null);
    const [sentFriendRequests, setSentFriendRequests] = useState<FriendRequest[]>([]);

    function findStatusOfSentFriendRequestForUser(requests: FriendRequest[], userId: string) {
        if (requests.find(request => request.receiver.id === userId)) {
            const sentRequestStatusForUser = requests.find(request => request.receiver.id === userId)?.status;
            console.log("Sent Request found: ", sentRequestStatusForUser, " for user: ", userId);
            return sentRequestStatusForUser;
        }
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

    useEffect(() => {
        if (isExpanded && cardRef.current) {
            cardRef.current.scrollIntoView({behavior: "smooth", block: "center"});
        }
    }, [isExpanded]);

    useEffect(() => {
        fetchSentFriendRequestsForCurrentUser();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="user-card">

            <div className={`expandable-user-card-content ${isExpanded ? "show" : ""}`}>
                <UserCardHeader user={user} isExpanded={isExpanded} handleOnUserCardClick={handleOnUserCardClick}/>
                {!isFriend && (receivedFriendRequest && receivedFriendRequest.receiver.id === user.id) &&
                    <>
                        <p>Received at: </p>
                        <p>{new Date(receivedFriendRequest.timestamp).toLocaleDateString()}</p>
                    </>
                }
                <StandardUserInformation user={user}/>
                {isFriend &&
                    <button className="classic-button"
                            onClick={handleRemoveFriend && (() => handleRemoveFriend(user.id))}>Remove from
                        Friends</button>
                }
                {!isFriend && (findStatusOfSentFriendRequestForUser(sentFriendRequests, user.id) === "PENDING") &&
                    <>
                        <p>Friend Request is pending.</p>
                        <p>It was sent on {
                            sentFriendRequests.find(request => request.receiver.id === user.id)?.timestamp
                                ? new Date(sentFriendRequests.find(request => request.receiver.id === user.id)?.timestamp as string).toLocaleDateString()
                                : "No timestamp available"
                        }</p>
                    </>
                }
                {!isFriend && (sentFriendRequests.find(request => request.receiver.id === user.id)?.status === "ACCEPTED") &&
                    <p>Friend Request was accepted on {
                        sentFriendRequests.find(request => request.receiver.id === user.id)?.timestamp
                            ? new Date(sentFriendRequests.find(request => request.receiver.id === user.id)?.timestamp as string).toLocaleDateString()
                            : "No timestamp available"
                    }</p>
                }
                {!isFriend && (sentFriendRequests.find(request => request.receiver.id === user.id)?.status === "REJECTED") &&
                    <p>Friend Request was rejected on {
                        sentFriendRequests.find(request => request.receiver.id === user.id)?.timestamp
                            ? new Date(sentFriendRequests.find(request => request.receiver.id === user.id)?.timestamp as string).toLocaleDateString()
                            : "No timestamp available"
                    }</p>
                }
                {!isFriend && !sentFriendRequests.find(request => request.receiver.id === user.id) &&
                    <button className="classic-button send-friend-request-button"
                            onClick={() => handleSendFriendRequest && handleSendFriendRequest(user)}>
                        Send Friend Request</button>
                }
            </div>
        </div>
    )
}
