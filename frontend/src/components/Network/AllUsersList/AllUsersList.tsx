import UserCard from "../UserCard/UserCard.tsx";
import {User} from "../../../Types/User.ts";
import {useState} from "react";

type AllUsersListProps = {
    users: User[];
    currentUserId: string | null;
    friends: User[];
    removeFriend: (friendId: string) => void;
    handleSendFriendRequest: (user: User) => void;
}
export default function AllUsersList({users, currentUserId, friends, removeFriend, handleSendFriendRequest}: Readonly<AllUsersListProps>) {
    const [expandedUserId, setExpandedUserId] = useState<string | null>(null);

    function onUserCardClick(id: string) {
        if (expandedUserId === id) {
            setExpandedUserId(null);
        } else {
            setExpandedUserId(id);
        }
    }

    return (
        <ul className="user-list">
            {users.map((user) => (
                user.id !== currentUserId &&
                <li key={user.id}>
                    <div className="user-card-content">
                        <UserCard user={user}
                                  handleOnUserCardClick={onUserCardClick}
                                  isExpanded={user.id === expandedUserId}
                                    handleSendFriendRequest={handleSendFriendRequest}
                                  handleRemoveFriend={removeFriend}
                                  isFriend={!!friends.find(friend => friend.id === user.id)}
                        />
                    </div>
                </li>
            ))}
        </ul>
    )
}