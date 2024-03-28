import Layout from "./Layout.tsx";
import {Route, Routes} from "react-router-dom";
import Home from "./components/Home/Home.tsx";
import Projects from "./components/Projects/Projects.tsx";
import Competitions from "./components/Competitions/Competitions.tsx";
import Network from "./components/Network/Network.tsx";
import CompleteProfile from "./components/CompleteProfile/CompleteProfile.tsx";
import Profile from "./components/Profile/Profile.tsx";
import {useState} from "react";

export default function App() {
    const [currentUserId, setCurrentUserId] = useState<string>("");


    function handleSetCurrentUserId(id: string) {
        setCurrentUserId(id);
    }

    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Home setCurrentUserId={handleSetCurrentUserId}/>}/>
                <Route path="/complete-profile" element={<CompleteProfile setCurrentUserId={handleSetCurrentUserId}/>}/>
                <Route path="/profile" element={<Profile currentUserId={currentUserId} setCurrentUserId={handleSetCurrentUserId}/>}/>
                <Route path="/projects" element={<Projects/>}/>
                <Route path="/competitions" element={<Competitions/>}/>
                <Route path="/network" element={<Network/>}/>
            </Routes>
        </Layout>
    )
}
