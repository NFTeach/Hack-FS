import React from 'react';
import { Link } from "react-router-dom";
import { defaultImgs } from "../images/defaultImgs";
import { useMoralis } from 'react-moralis';
import "../css/Profile.css";


const Profile = () => {
    const { Moralis } = useMoralis();
    const user = Moralis.User.current();

  return (
    <>
        <div className="page">
            <div className="mainWindow">
            <img className="profileBanner" src={user.attributes.banner ? user.attributes.banner : defaultImgs[1]} alt="profileBanner"></img>
            <div className="pfpContainer">
                <img className="profilePFP" src={user.attributes.pfp ? user.attributes.pfp : defaultImgs[0]} alt="profilePFP"></img>
                <div className="profileName">{user.attributes.username.slice(0, 6)}</div>
                <div className="profileWallet">{
                    `${user.attributes.ethAddress.slice(0, 4)}...
                    ${user.attributes.ethAddress.slice(38)}`
                    }
                </div>
                <Link to="/settings">
                    <div className="profileEdit">Edit profile</div>
                </Link>
                <div className="profileBio">
                    {user.attributes.bio}
                </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default Profile
