import "./Network.css"
import {User} from "../../Types/User.ts";
import {useEffect, useState} from "react";
import UserCard from "./UserCard/UserCard.tsx";
import AllUsersList from "./AllUsersList/AllUsersList.tsx";
import {fetchFriends} from "../../Utils/API/ApiFunctions.ts";
import axios from "axios";
import {Logger} from "../../Logger/Logger.tsx";


export default function Network() {
    const currentUserId = localStorage.getItem("currentUserId");
    const [expandedUserId, setExpandedUserId] = useState<string | null>(null);
    const [friends, setFriends] = useState<User[]>([]);

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
    useEffect(() => {
        if (currentUserId) {
            fetchFriends(currentUserId, setFriends);
        }
        // eslint-disable-next-line
    }, [currentUserId]);

    return (
        <div className="network-container">
            <h2>Network</h2>


            {friends.length > 0 ?
                <>
                    <h3>List of all Friends:</h3>
                    <ul className="user-list">
                        {friends.map(friend => (
                            <li key={friend.id}>
                                <UserCard user={friend}
                                          isExpanded={friend.id === expandedUserId}
                                          handleRemoveFriend={removeFriend}
                                          isFriend={true}
                                          handleOnUserCardClick={onUserCardClick}
                                />
                            </li>
                        ))
                        }
                    </ul>
                </>
                :
                <>
                    <h3 className="no-friends-headline">You don't have any friends, yet</h3>
                    <p>Add friends by sending them a friend request</p>
                </>
            }
            <h3>List of all Users:</h3>
            <AllUsersList/>
        </div>
    )
}