import Icon from "../../../../assets/Icons/Icons.tsx";
import {User} from "../../../../Types/User.ts";

type UserCardHeaderProps = {
    user: User;
    isExpanded: boolean;
    handleOnUserCardClick: (id: string) => void;
}
export default function UserCardHeader({user, isExpanded, handleOnUserCardClick}: Readonly<UserCardHeaderProps>) {
    return (
            <div className="user-card-header">
                {isExpanded ?
                    <button className="close-button" onClick={() => handleOnUserCardClick(user.id)}>
                    <Icon variant="lessArrow" size={20} backgroundColor="var(--standardFondColor)"
                          strokeColor="var(--standardFondColor)" strokeWidth={1} />
                        </button>
                    :
                    <button className="close-button" onClick={() => handleOnUserCardClick(user.id)}>
                    <Icon variant="moreArrow" size={20} backgroundColor="var(--standardFondColor)"
                          strokeColor="var(--standardFondColor)" strokeWidth={1}/>
                    </button>

                }
                <p>{user.name}</p>
                <img className="user-picture" src={user.picture} alt="profile"/>
            </div>
    )
}