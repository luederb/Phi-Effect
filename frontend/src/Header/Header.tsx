import "./Header.css";
import Icons from "../assets/Icons/Icons.tsx";
import {Link} from "react-router-dom";

export default function Header() {

    return (
        <header>
            <Link className="header" to="/">
                <h1>Phi-Effect</h1>
            </Link>
            <Link to="/profile" >
                <Icons variant="profile" backgroundColor="var(--standardBackgroundColor)" strokeColor="var(--standardIconStrokeColor)" strokeWidth={3} size={50}/>
            </Link>
        </header>
    )
}