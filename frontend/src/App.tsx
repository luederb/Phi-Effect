import Layout from "./Layout.tsx";
import {Route, Routes} from "react-router-dom";
import Home from "./components/Home/Home.tsx";
import Projects from "./components/Projects/Projects.tsx";
import Competitions from "./components/Competitions/Competitions.tsx";
import Network from "./components/Network/Network.tsx";
import CompleteProfile from "./components/CompleteProfile/CompleteProfile.tsx";
import Profile from "./components/Profile/Profile.tsx";
import {useState} from "react";
import {Logger} from "./Logger/Logger.tsx";

export default function App() {
    const [currentUserId, setCurrentUserId] = useState<string>("");


    function handleSetCurrentUserId(id: string) {
        setCurrentUserId(id);
    }

    function login() {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080': window.location.origin
        window.open(host + '/oauth2/authorization/google', '_self')
        Logger.log("I want to sign in with google");
    }

    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Home setCurrentUserId={handleSetCurrentUserId} handleLogin={login}/>}/>
                <Route path="/complete-profile" element={<CompleteProfile setCurrentUserId={handleSetCurrentUserId}/>}/>
                <Route path="/profile" element={<Profile currentUserId={currentUserId} setCurrentUserId={handleSetCurrentUserId} handleLogin={login}/>}/>
                <Route path="/projects" element={<Projects/>}/>
                <Route path="/competitions" element={<Competitions/>}/>
                <Route path="/network" element={<Network/>}/>
            </Routes>
        </Layout>
    )
}
