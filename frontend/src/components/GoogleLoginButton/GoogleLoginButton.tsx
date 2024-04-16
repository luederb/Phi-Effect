import './GoogleLoginButton.css';

export default function GoogleLoginButton() {

    function login() {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080' : window.location.origin
        window.open(host + '/oauth2/authorization/google', '_self')
    }

    return (
        <button onClick={login}>
            <img src="https://developers.google.com/identity/images/btn_google_signin_light_normal_web.png"
                 alt={"Google Login"}/>
        </button>
    )
}