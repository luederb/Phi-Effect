import "./Home.css";

import HomeWithoutLogin from "./HomeWithoutLogin/HomeWithoutLogin";
import {User} from "../../Types/User.ts";
import ProjectsOverviewTable from "./ProjectsOverviewTable/ProjectsOverviewTable.tsx";
import FriendRequests from "../Network/FriendRequests/FriendRequests.tsx";
import {useEffect, useState} from "react";
import {fetchCurrentUser} from "../../Utils/API/ApiFunctions.ts";

type HomeProps = {
    handleLogin: () => void;
}
export default function Home({
                                 handleLogin
                             }: Readonly<HomeProps>) {
    const [currentUser, setCurrentUser] = useState<User>({} as User);

    useEffect(() => {
        fetchCurrentUser(setCurrentUser);
        // eslint-disable-next-line
    }, []);

    return (
        <div className="home-container">
            {currentUser.name ?
                <>
                    <h2>Welcome, {currentUser.firstName}</h2>
                    <ProjectsOverviewTable/>
                    <FriendRequests/>
                </>
                :
                <HomeWithoutLogin handleLogin={handleLogin}/>}
        </div>
    )
}
