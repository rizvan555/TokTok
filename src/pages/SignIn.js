import axios from "axios";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

// Import - Style -----------------------

import "../css/signin.css";
import toktokLogo_big from '../resource/logos/toktokLogo-big.png';
import mailIcon from '../resource/icons/Messageemail_icon-filed.png';
import showIcon from '../resource/icons/view-eye-svgrepo-com.svg';
import hideIcon from '../resource/icons/eye-off-svgrepo-com.svg';

// --------------------------------------

const SignIn = () => {

    const navigate = useNavigate()
    const { state: navState } = useLocation();
    const [error, setError] = useState(navState?.redirectReason || "");

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const [showPassword, setShowPassword] = useState(false);

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
            <form className="signin_form" onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    className="email"
                    value={user.email}
                    onChange={(e) => {
                        setUser({ ...user, email: e.target.value })
                    }} />
                <img className="mailIcon" src={mailIcon} alt="mail_icon" />
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="password"
                    value={user.password}
                    onChange={(e) => {
                        setUser({ ...user, password: e.target.value })
                    }} />
                <small>{error}</small>
                <span
                    className="toggle_password"
                    onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <img className="showIcon" src={showIcon} /> : <img className="hideIcon" src={hideIcon} />}
                </span>
                <button className="signin_btn">Log In</button>
            </form>
            <Link className="forgot_link">Forgot the password?</Link>
            <p className="link_to">Don't have an account? <Link to={"/signup"}>Sign up</Link></p>
        </div>
    );
}

export default SignIn;