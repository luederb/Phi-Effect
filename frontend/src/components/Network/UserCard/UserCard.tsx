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
            <button className={`user-card-content ${isExpanded ? "show" : ""}`} onClick={() => onUserClick(user.id)}>
                <Icon variant="moreArrow" size={20} backgroundColor="var(--standardFondColor)"
                      strokeColor="var(--standardFondColor)" strokeWidth={1}/>
                <p>{user.name}</p>
                <img className="user-picture" src={user.picture} alt="profile"/>
            </button>
        </div>
    )
}