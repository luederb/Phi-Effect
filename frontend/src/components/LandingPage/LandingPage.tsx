import "./LandingPage.css";
import {LazyLoadImage} from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import movieTheater from "../../assets/Images/movieTheater.png";
import Lottie from "lottie-react";
import HorseAnimation from "../../assets/LottieFiles/LogoAnimation.json";
import LoadingAnimation from "../../assets/LottieFiles/LoadingAnimation.json";
import {Link} from "react-router-dom";
import GoogleLoginButton from "../GoogleLoginButton/GoogleLoginButton.tsx";
import {useEffect, useState} from "react";


export default function LandingPage() {


    const style = getComputedStyle(document.documentElement);
    const mobileHeight = parseInt(style.getPropertyValue("--mobileHeight"));
    const mobileWidth = parseInt(style.getPropertyValue("--mobileWidth"));
    const [showLoginButton, setShowLoginButton] = useState(false);

    console.log("mobile height", mobileHeight);
    console.log("mobile width", mobileWidth);
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoginButton(true)
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="landing-page-container">
            <div className="movieTheater-image">
                <LazyLoadImage src={movieTheater}
                               height={mobileHeight}
                               width={mobileWidth}
                               effect="blur"
                               alt="movieTheater"/>
            </div>
            <Link className="horseAnimation-text" to="https://en.wikipedia.org/wiki/Phi_phenomenon">
                <div className="horseAnimation-text-blur">
                    <h1>What's the Phi-Effect?</h1>
                </div>
                <div className="horseAnimation-text-blur">
                    <h2>Find it out here</h2>
                </div>
            </Link>
            <Link className="horseAnimation" to="https://en.wikipedia.org/wiki/The_Horse_in_Motion">
                <Lottie animationData={HorseAnimation}/>
            </Link>
            <div className={`google-login-button-container ${showLoginButton ? "show" : ""}`}>
                <GoogleLoginButton/>
                <Link className="link-as-button" to="/home">Proceed without Login</Link>
            </div>
            <div className={`loadingAnimation ${showLoginButton ? "" : "show"}`}>
                <Lottie animationData={LoadingAnimation} loop={false}/>
            </div>
        </div>
    )
}