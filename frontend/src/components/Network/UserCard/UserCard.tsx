import "./UserCard.css";
import {User} from "../../../Types/User.ts";
import Icon from "../../../assets/Icons/Icons.tsx";
import {useEffect, useRef} from "react";

type UserCardProps = {
    user: User;
    isExpanded: boolean;
    onUserClick: (id: string) => void;
}
export default function UserCard({user, isExpanded, onUserClick}: Readonly<UserCardProps>) {


    const cardRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (isExpanded && cardRef.current) {
            cardRef.current.scrollIntoView({behavior: "smooth", block: "center"});
        }
    }, [isExpanded]);

    return (
        <div className="user-card">
            <div className={`expandable-user-card-content ${isExpanded ? "show" : ""}`}>
                <button className="user-card-content" onClick={() => onUserClick(user.id)}>
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
                    <div className="user-card-line">
                        <p>Email: </p>
                        <p>{user.email}</p>
                    </div>
                    {user.phone !== 0 &&
                        <div className="user-card-line">
                            <p>Phone: </p>
                            <p className="phone-number">{`0${user.phone?.toString().slice(0, 3)}  -  ${user.phone?.toString().slice(3, 5)} ${user.phone?.toString().slice(5, 7)} ${user.phone?.toString().slice(7,9)} ${user.phone?.toString().slice(9)}`}</p>
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
                </button>
            <button className="classic-button send-friend-request-button">Send Friend Request</button>
            </div>
        </div>
    )
}