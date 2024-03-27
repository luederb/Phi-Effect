import './HomeWithoutLogin.css';
import '../../../Logger/Logger.tsx';
import {Link} from "react-router-dom";


export default function HomeWithoutLogin() {
    function login() {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080': window.location.origin
        window.open(host + '/oauth2/authorization/google', '_self')
        Logger.log("I want to sign in with google");
    }
    return (
        <div className="homeWithoutLogin-container">
            <h2>Welcome</h2>
            <p>On the following pages, you can browse through existing projects and competitions</p>
            <div>
                <Link to="/projects" className="link-as-button">Projects</Link>
                <Link to="/competitions" className="link-as-button">Competitions</Link>
            </div>
            <p>To create your own projects and competitions or to connect to other filmmakers, please sign in with your
                Google account:</p>
            <div>
                <button onClick={login}>Sign in</button>
            </div>
        </div>
    )
}