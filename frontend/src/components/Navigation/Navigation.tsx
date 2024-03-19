import './Navigation.css';
import {Link} from "react-router-dom";

export default function Navigation() {
    return (
        <nav>
            <Link className="projectsLink" to="/projects">Projects</Link>
            <Link className="competitionsLink" to="/competitions">Competitions</Link>
            <Link className="networkLink" to="/network">Network</Link>
        </nav>
    )
}