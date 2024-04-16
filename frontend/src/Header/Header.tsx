import "./Header.css";
import Icons from "../assets/Icons/Icons.tsx";
import {Link} from "react-router-dom";
import SvgImage from "../assets/Images/SvgImages.tsx";

export default function Header() {
    const style = getComputedStyle(document.documentElement);
    const headerElement = document.querySelector('header');
    let headerHeight = 0;
    let logoHeight = "0";

    if (headerElement !== null) {
        const computedStyle = window.getComputedStyle(headerElement);
        headerHeight = parseInt(computedStyle.getPropertyValue('height'));
        logoHeight = (headerHeight - 10).toString();
    }
    const standardBackgroundColor = style.getPropertyValue("--standardBackgroundColor");
    const standardIconStrokeColor = style.getPropertyValue("--standardIconStrokeColor");

    return (
        <header>
            <Link to="/home">
                <div className="name-and-logo">
                    <h1>Phi-Effect</h1>
                    <SvgImage className="logo" variant="logo" height={logoHeight}
                              fill="var(--highlightColor)"/>
                </div>
            </Link>
            <Link to="/profile">
                <Icons variant="profile" backgroundColor={standardBackgroundColor}
                       strokeColor={standardIconStrokeColor} strokeWidth={3} size={50}/>
            </Link>
        </header>
    )
}