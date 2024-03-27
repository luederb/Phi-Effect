import {useNavigate} from "react-router-dom";

export default function CompleteProfile() {
    const navigate = useNavigate();

    function navigateToHomepage() {
        navigate("/");
    }

    return (
        <>
            <h1>Complete your Profile</h1>
            <button onClick={navigateToHomepage}>Submit</button>
        </>
    )
}