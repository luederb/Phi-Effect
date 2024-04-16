import './Navigation.css';
import {Link} from "react-router-dom";

export default function Navigation() {
    return (
        <nav>
            <Link to="/projects">Projects</Link>
            <Link to="/home">Home</Link>
            <Link to="/network">Network</Link>
        </nav>
    )
}