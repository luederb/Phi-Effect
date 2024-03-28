import "./HomeWithoutLogin.css";
import {Link} from "react-router-dom";

type HomeWithoutLoginProps = {
    handleLogin: () => void;
}

export default function HomeWithoutLogin({handleLogin}: Readonly<HomeWithoutLoginProps>) {

    return (
        <div className="homeWithoutLogin-container">
            <h2>Welcome</h2>
            <div className="projects-and-competitions-links">
                <p>On the following pages, you can browse through existing projects and competitions</p>
                <Link to="/projects" className="link-as-button">Projects</Link>
                <Link to="/competitions" className="link-as-button">Competitions</Link>
            </div>
            <p>To create your own projects and competitions or to connect to other filmmakers, please sign in with your
                Google account:</p>
            <div>
                <button onClick={handleLogin}>Sign in</button>
            </div>
        </div>
    )
}