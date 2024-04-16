import "./UserCard.css";
import {User} from "../../../Types/User.ts";
import {useEffect, useRef} from "react";
import {FriendRequest} from "../../../Types/FriendRequest.ts";
import StandardUserInformation from "./StandardUserInformation/StandardUserInformation.tsx";
import UserCardHeader from "./UserCardHeader/UserCardHeader.tsx";

type UserCardProps = {
    user: User;
    receivedFriendRequest?: FriendRequest;
    sentFriendRequest?: FriendRequest;
    isExpanded: boolean;
    handleRemoveFriend?: (friendId: string) => void;
    isFriend?: boolean;
    handleOnUserCardClick: (id: string) => void;
    handleAcceptFriendRequest?: (friendId: string, friendRequestId: string) => void;
    handleRejectFriendRequest?: (friendId: string, friendRequestId: string) => void;
    handleSendFriendRequest?: (user: User) => void;
}
export default function UserCard({
                                     user,
                                     receivedFriendRequest,
                                     sentFriendRequest,
                                     isExpanded,
                                     handleRemoveFriend,
                                     isFriend,
                                     handleOnUserCardClick,
                                     handleAcceptFriendRequest,
                                     handleRejectFriendRequest,
                                     handleSendFriendRequest,
                                 }: Readonly<UserCardProps>) {

    const cardRef = useRef<HTMLButtonElement>(null);

    function findSentFriendRequestForUser(userId: string) {
        if (sentFriendRequest?.receiver.id === userId) {
            return sentFriendRequest;
        }
    }

    function findReceivedFriendRequestForUser(userId: string) {
        if (receivedFriendRequest?.sender.id === userId) {
            return receivedFriendRequest;
        }
    }

    useEffect(() => {
        if (isExpanded && cardRef.current) {
            cardRef.current.scrollIntoView({behavior: "smooth", block: "center"});
        }
    }, [isExpanded]);

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
                {!isFriend && (findSentFriendRequestForUser(user.id)?.status === "PENDING") &&
                    <>
                        <p>Friend Request is pending.</p>
                        <p>It was sent on {
                            findSentFriendRequestForUser(user.id)?.timestamp
                                ? new Date(findSentFriendRequestForUser(user.id)?.timestamp as string).toLocaleDateString()
                                : "No timestamp available"
                        }</p>
                    </>
                }
                {!isFriend && (findSentFriendRequestForUser(user.id)?.status === "ACCEPTED") &&
                    <p>Friend Request was accepted on {
                        findSentFriendRequestForUser(user.id)?.timestamp
                            ? new Date(findSentFriendRequestForUser(user.id)?.timestamp as string).toLocaleDateString()
                            : "No timestamp available"
                    }</p>
                }
                {!isFriend && (findSentFriendRequestForUser(user.id)?.status === "REJECTED") &&
                    <p>Friend Request was rejected on {
                        findSentFriendRequestForUser(user.id)?.timestamp
                            ? new Date(findSentFriendRequestForUser(user.id)?.timestamp as string).toLocaleDateString()
                            : "No timestamp available"
                    }</p>
                }
                {!isFriend && (findReceivedFriendRequestForUser(user.id)?.status === "ACCEPTED") &&
                    <p>Friend Request was accepted on {
                        findReceivedFriendRequestForUser(user.id)?.timestamp
                            ? new Date(findReceivedFriendRequestForUser(user.id)?.timestamp as string).toLocaleDateString()
                            : "No timestamp available"
                    }</p>
                }
                {!isFriend && (findReceivedFriendRequestForUser(user.id)?.status === "PENDING") &&
                    <>
                        <p>Friend Request is pending.</p>
                        <p>It was sent on {
                            findReceivedFriendRequestForUser(user.id)?.timestamp
                                ? new Date(findReceivedFriendRequestForUser(user.id)?.timestamp as string).toLocaleDateString()
                                : "No timestamp available"
                        }</p>
                    </>
                }
                {!isFriend && (findReceivedFriendRequestForUser(user.id)?.status === "REJECTED") &&
                    <p>Friend Request was rejected on {
                        findReceivedFriendRequestForUser(user.id)?.timestamp
                            ? new Date(findReceivedFriendRequestForUser(user.id)?.timestamp as string).toLocaleDateString()
                            : "No timestamp available"
                    }</p>
                }
                {(!isFriend &&
                        (!findSentFriendRequestForUser(user.id) && (findSentFriendRequestForUser(user.id)?.status !== "PENDING")) &&
                        (!findSentFriendRequestForUser(user.id) && (findReceivedFriendRequestForUser(user.id)?.status !== "PENDING"))) &&
                    <button className="classic-button send-friend-request-button"
                            onClick={() => (handleSendFriendRequest && handleSendFriendRequest(user))}>
                        Send Friend Request</button>
                }
                {!isFriend && findReceivedFriendRequestForUser(user.id) && (findReceivedFriendRequestForUser(user.id)?.status === "PENDING") && !findSentFriendRequestForUser(user.id) &&
                    <>
                        <button className="classic-button"
                                onClick={() => (receivedFriendRequest && handleRejectFriendRequest && handleRejectFriendRequest(receivedFriendRequest.sender.id, receivedFriendRequest.id))}>reject
                        </button>
                        <button className="classic-button"
                                onClick={() => (receivedFriendRequest && handleAcceptFriendRequest && handleAcceptFriendRequest(receivedFriendRequest.sender.id, receivedFriendRequest.id))}>accept
                        </button>
                    </>
                }
            </div>
        </div>
    )
}
