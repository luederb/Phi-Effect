import "./UserCard.css";
import {User} from "../../../Types/User.ts";
import Icon from "../../../assets/Icons/Icons.tsx";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {Logger} from "../../../Logger/Logger.tsx";
import {FriendRequest} from "../../../Types/FriendRequest.ts";

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
                <div className="user-card-header">
                    {isExpanded ?
                        <Icon variant="lessArrow" size={20} backgroundColor="var(--standardFondColor)"
                              strokeColor="var(--standardFondColor)" strokeWidth={1}/>
                        :
                        <Icon variant="moreArrow" size={20} backgroundColor="var(--standardFondColor)"
                              strokeColor="var(--standardFondColor)" strokeWidth={1}/>
                    }
                    <p>{user.name}</p>
                    <img className="user-picture" src={user.picture} alt="profile"/>
                </div>
                {!isFriend && (receivedFriendRequest && receivedFriendRequest.receiver.id === user.id) &&
                    <>
                        <p>Received at: </p>
                        <p>{new Date(receivedFriendRequest.timestamp).toLocaleDateString()}</p>
                    </>
                }
                <div className="user-card-line">
                    <p>Email: </p>
                    <p>{user.email}</p>
                </div>
                {user.phone !== 0 &&
                    <div className="user-card-line">
                        <p>Phone: </p>
                        <p className="phone-number">{`0${user.phone?.toString().slice(0, 3)}  -  ${user.phone?.toString().slice(3, 5)} ${user.phone?.toString().slice(5, 7)} ${user.phone?.toString().slice(7, 9)} ${user.phone?.toString().slice(9)}`}</p>
                    </div>}
                {user.bio !== "" &&
                    <div className="user-card-line">
                        <p>Bio: </p>
                        <p>{user.bio}</p>
                    </div>}
                {user.favoriteProjects?.entries() &&
                    <div className="user-card-line">
                        <p>Favorite Projects: </p>
                        <p>{user.favoriteProjects}</p>
                    </div>}

                {isFriend &&
                    <button className="classic-button" onClick={handleRemoveFriend && (() => handleRemoveFriend(user.id))}>Remove from
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
