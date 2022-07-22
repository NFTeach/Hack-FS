import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { defaultImgs } from "../images/defaultImgs";
import moralis from "moralis";
import "../css/Profile.css";
import { Button } from 'antd';

moralis.initialize(process.env.REACT_APP_MORALIS_APPLICATION_ID);
moralis.serverURL = process.env.REACT_APP_MORALIS_SERVER_URL;

const Profile = () => {
    const styles = {
        button: {
            float: "left",
            marginTop: "10px",
        },
    }

    const [isWithdrawInProgress, setIsWithdrawInProgress] = useState(false)

    const [banner, setBanner] = useState();
    const [pfp, setPfp] = useState();
    const user = moralis.User.current();

    useEffect(() => {
        if(!user) return null;
        setBanner(user.get("banner"));
        setPfp(user.get("pfp"))
    }, [user]);

  return (
    <>
        <div className="page">
            <div className="mainWindow">
            <img className="profileBanner" src={banner ? banner : defaultImgs[1]} alt="profileBanner"></img>
            <div className="pfpContainer">
                <img className="profilePFP" src={pfp ? pfp : defaultImgs[0]} alt="profilePFP"></img>
                <div className="profileName">{user?.attributes.username.slice(0, 6)}</div>
                <div className="profileWallet">{
                    `${user?.attributes.ethAddress.slice(0, 4)}...
                    ${user?.attributes.ethAddress.slice(38)}`
                    }
                </div>
                <Link to="/profilesettings">
                    <div className="profileEdit">Edit Profile</div>
                </Link>
                <div className="profileBio">
                    {user?.attributes.bio}
                </div>
                <Button
                    style={styles.button}
                    type="primary"
                    loading={isWithdrawInProgress}
                    onClick={async () => {
                        setIsWithdrawInProgress(true);
                        
                    }}
                >
                    Hello world!
                </Button>
            </div>
        </div>
      </div>
    </>
  )
}

export default Profile
