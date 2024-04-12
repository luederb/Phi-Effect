import WebFont from 'webfontloader';
import Layout from "./Layout.tsx";
import {Route, Routes} from "react-router-dom";
import Home from "./components/Home/Home.tsx";
import Projects from "./components/Projects/Projects.tsx";
import Competitions from "./components/Competitions/Competitions.tsx";
import Network from "./components/Network/Network.tsx";
import CompleteProfile from "./components/Profile/CompleteProfile/CompleteProfile.tsx";
import Profile from "./components/Profile/Profile.tsx";
import CreateNewProject from "./components/Projects/CreateNewProject/CreateNewProject.tsx";
import ProjectDetailsPage from "./components/Projects/EditProjectPage/EditProjectPage.tsx";

WebFont.load({
    google: {
        families: ['Open Sans:400,700']
    }
});
export default function App() {


    function login() {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080': window.location.origin
        window.open(host + '/oauth2/authorization/google', '_self')
    }

    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Home handleLogin={login}/>}/>
                <Route path="/complete-profile" element={<CompleteProfile/>}/>
                <Route path="/profile" element={<Profile handleLogin={login}/>}/>
                <Route path="/projects" element={<Projects/>}/>
                <Route path="/projects/create" element={<CreateNewProject/>}/>
                <Route path="/projects/edit/:id" element={<ProjectDetailsPage/>}/>
                <Route path="/competitions" element={<Competitions/>}/>
                <Route path="/network" element={<Network/>}/>
            </Routes>
        </Layout>
    )
}
