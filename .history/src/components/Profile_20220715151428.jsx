import React from 'react';
import { defaultImgs } from "../images/defaultImgs";
import { useMoralis } from 'react-moralis';
import "../css/Profile.css";


const Profile = () => {
    const { Moralis } = useMoralis();
    const user = Moralis.User.current();

  return (
    <>
      <div className="pageIdentfy">Profile</div>
      <img className="profileBanner" src={user.attributes.banner ? user.attributes.banner : defaultImgs[1]}></img>
    </>
  )
}

export default Profile
