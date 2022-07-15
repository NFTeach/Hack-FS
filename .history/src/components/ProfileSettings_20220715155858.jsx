import React, { useState, useRef, useEffect } from 'react';
import { Input } from 'antd';
import { defaultImgs } from '../images/defaultImgs';
import { useMoralis, useMoralisWeb3Api } from "react-moralis";

const appId = process.env.REACT_APP_MORALIS_APPLICATION_ID;
const serverUrl = process.env.REACT_APP_MORALIS_SERVER_URL;
const moralisSecert = process.env.REACT_APP_MORALIS_SECERT;

const ProfileSettings = () => {
  return (
    <div>
      <h1>Hello world!</h1>
    </div>
  )
}

export default ProfileSettings
