import { Link } from "react-router-dom";

// Import - Images -----------------------------------
import logo from "../resource/logos/toktokLogo.png";
import postIcon from "../resource/icons/Plusframe_rounded.png";
import editIcon from "../resource/icons/EditeditIcon.png";
import settingIcon from "../resource/icons/GroupsettingIcon.png";
import { PiDotsThreeCircle } from "react-icons/pi";
import { LuEdit3 } from "react-icons/lu";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { Link } from "react-router-dom";

// ---------------------------------------------------

const ProfileMainBar = ({ click, setClick, darkLight }) => {
    return (
        <nav className="profile_mainbar">
            <section>
                <Link to="/">
                    <img src={logo} alt="logo toktok klein" />
                </Link>
                <h2 style={{ color: !darkLight ? "white" : "black" }}> john_doe</h2>
            </section>
            <nav className="head-navigation">
                <Link to='/upload'> <AiOutlinePlusSquare
                    size={29}
                    style={{ color: !darkLight ? "white" : "black" }}
                /></Link>
                <Link to='/editprofile'><LuEdit3 size={28} style={{ color: !darkLight ? "white" : "black" }} /></Link>
                <button className="settingsButton" onClick={() => setClick(!click)}>
                    <PiDotsThreeCircle
                        size={30}
                        style={{ color: !darkLight ? "white" : "black", marginLeft: "-8px" }}
                    />
                </button>
            </nav>
        </nav>
    );
};

export default ProfileMainBar;
