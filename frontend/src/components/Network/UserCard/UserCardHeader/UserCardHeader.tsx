import Icon from "../../../../assets/Icons/Icons.tsx";
import {User} from "../../../../Types/User.ts";

type UserCardHeaderProps = {
    user: User;
    isExpanded: boolean;
}
export default function UserCardHeader({user, isExpanded}: Readonly<UserCardHeaderProps>) {
    return (
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
    )
}