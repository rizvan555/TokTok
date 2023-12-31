import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Import - Style -----------------------

import "../css/signup.css";
import toktokLogo_big from '../resource/logos/toktokLogo-big.png';
import mailIcon from '../resource/icons/Messageemail_icon-filed.png';
import showIcon from '../resource/icons/view-eye-svgrepo-com.svg';
import hideIcon from '../resource/icons/eye-off-svgrepo-com.svg';

// --------------------------------------

const defaultErrorState = Object.freeze({
  general: "",
  name: "",
  email: "",
  password: "",
});

const defaultData = Object.freeze({
  name: "",
  email: "",
  password: "",
});

const SignUp = () => {

  const [data, setData] = useState(defaultData)
  const navigate = useNavigate()
  const [error, setError] = useState(defaultErrorState);

  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault()

    // Um dies zu prüfen, Inputfeler im Frontend ausfüllen
    console.log(data);
    await axios.post("/api/signup", data)
      .then((res) => {
        console.log(res)
        setData(defaultData);
        navigate("/signin")
      }).catch((err) => {
        console.error(err)
        let responseError = error?.response?.data?.error;
        if (responseError?.errors) {
          const propertyMessageMap = Object.entries(responseError.errors).reduce(
            (acc, [key, value]) => {
              acc[key] = value.message;
              return acc;
            },
            {}
          );
          console.log(propertyMessageMap);
          setError(propertyMessageMap);
        } else {
          setError((prevError) => ({
            ...prevError,
            general: error?.response?.data?.error?.message || "",
          }));
        }
      })
  }

  return (
    <div className="signup_page">
      <h2 className="headline">Create your Account</h2>
      <img className="toktokLogo" src={toktokLogo_big} alt="tiktokLogo_big" />
      <form className="signup_form" onSubmit={handleSignIn}>
        <input
          type="email"
          placeholder="Email"
          className="email"
          value={data.email}
          onChange={(e) => {
            setData({ ...data, email: e.target.value })
          }} />
        <img className="mailIcon" src={mailIcon} alt="mail_icon" />
        <small>{error.email && error.email}</small>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="password"
          value={data.password}
          onChange={(e) => {
            setData({ ...data, password: e.target.value })
          }} />
        <small>{error.password && error.password}</small>
        <span
          className="toggle_password"
          onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <img className="showIcon" src={showIcon} /> : <img className="hideIcon" src={hideIcon} />}
        </span>
        <button className="signup_btn">Sign up</button>
      </form>
      <p className="link_to">Already have an account? <Link to={"/signin"}>Sign in</Link></p>
    </div>
  );
}

export default SignUp;