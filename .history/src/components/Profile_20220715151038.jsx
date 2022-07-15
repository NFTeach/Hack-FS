import React from 'react';
import { defaultImgs } from "../images/defaultImgs";
import { useMoralis } from 'react-moralis';
import "../css/Profile";


const Profile = () => {
    const { Moralis } = useMoralis();
    const user = Moralis.User.current();

  return (
    <div>
      
    </div>
  )
}

export default Profile
