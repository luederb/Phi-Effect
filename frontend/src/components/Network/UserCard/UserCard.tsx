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
}
export default function UserCard({
                                     user,
                                     receivedFriendRequest,
                                     isExpanded,
                                     handleSendFriendRequest,
                                     handleRemoveFriend,
                                     isFriend
                                 }: Readonly<UserCardProps>) {

    const currentUserId = localStorage.getItem("currentUserId");

    const cardRef = useRef<HTMLButtonElement>(null);
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
                <UserCardHeader user={user} isExpanded={isExpanded}/>

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
                {!isFriend && sentFriendRequests.some(request => request.receiver.id === user.id) &&
                    <p>Friend Request is pending</p>
                }
                {!isFriend && !sentFriendRequests.some(request => request.receiver.id === user.id) &&
                    <button className="classic-button send-friend-request-button"
                            onClick={() => handleSendFriendRequest && handleSendFriendRequest(user)}>Send
                        Friend Request</button>
                }
            </div>
        </div>
    )
}
