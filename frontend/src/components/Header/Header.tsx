import {Link} from "react-router-dom";
import './Header.css';

export default function Header() {
    return (
        <header>
            <Link className="header" to="/">
                <h1>Phi-Effect</h1>
            </Link>
        </header>
    )
}