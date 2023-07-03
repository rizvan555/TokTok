import axios from "axios";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

// Import - Style -----------------------

import "../css/signin.css";
import toktokLogo_big from '../resource/logos/toktokLogo-big.png';

// --------------------------------------

const SignIn = () => {

    const navigate = useNavigate()
    const { state: navState } = useLocation();
    const [error, setError] = useState(navState?.redirectReason || "");

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        // Um dies zu prüfen, Inputfeler im Frontend ausfüllen
        console.log(user);
        await axios.post("/api/signin", user)
            .then((res) => {
                console.log(res)
                navigate("/")
            }).catch((error) => {
                const responseError = error?.response?.data?.error?.message;
                if (responseError) {
                    setError(responseError);
                } else {
                    setError("Something went wrong please try later");
                }
            })
    }

    return (
        <div className="signin_page">
            <h2 className="headline">Login to your Account</h2>
            <img className="toktokLogo" src={toktokLogo_big} alt="tiktokLogo_big" />
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    id="email"
                    value={user.email}
                    onChange={(e) => {
                        setUser({ ...user, email: e.target.value })
                    }} />
                <input
                    type="password"
                    placeholder="Password"
                    id="password"
                    value={user.password}
                    onChange={(e) => {
                        setUser({ ...user, password: e.target.value })
                    }} />
                <small>{error}</small>
                <button>Log In</button>
            </form>
            <Link className="forgot_link">Forgot the password?</Link>
            <p className="link_to">Don't have an account? <Link to={"/signup"}>Sign up</Link></p>

        </div>
    );
}

export default SignIn;