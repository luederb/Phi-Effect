import Layout from "./Layout.tsx";
import {Route, Routes} from "react-router-dom";
import Home from "./components/Home/Home.tsx";
import Projects from "./components/Projects/Projects.tsx";
import Competitions from "./components/Competitions/Competitions.tsx";
import Network from "./components/Network/Network.tsx";
import CompleteProfile from "./components/CompleteProfile/CompleteProfile.tsx";

export default function App() {

    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/complete-profile" element={<CompleteProfile/>}/>
                <Route path="/projects" element={<Projects/>}/>
                <Route path="/competitions" element={<Competitions/>}/>
                <Route path="/network" element={<Network/>}/>
            </Routes>
        </Layout>
    )
}
