import axios from "axios";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

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
        <div>

            <h2>Login to your Account</h2>

            <form onSubmit={handleLogin}>

                <input type="email" placeholder="Email" id="email" value={user.email} onChange={(e) => { setUser({ ...user, email: e.target.value }) }} />

                <input type="password" placeholder="Password" id="password" value={user.password} onChange={(e) => { setUser({ ...user, password: e.target.value }) }} />
                <small>{error}</small>

                <button>Log In</button>

            </form>

            <p>Don't have an account? <Link to={"/signup"}>Sign up</Link></p>
            <Link>Forgot the password?</Link>

        </div>
    );
}

export default SignIn;