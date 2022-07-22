import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { defaultImgs } from "../images/defaultImgs";
import moralis from "moralis";
import "../css/Profile.css";
import { 
    Button,
    notification 
} from 'antd';
import { 
    useMoralis,
    useMoralisFile,
    useWeb3ExecuteFunction
} from 'react-moralis';
import { CONTRACT_ADDRESS } from "./consts/vars";
import { NFTEACH_CONTRACT_ABI } from "./consts/contractABIs";

moralis.initialize(process.env.REACT_APP_MORALIS_APPLICATION_ID);
moralis.serverURL = process.env.REACT_APP_MORALIS_SERVER_URL;

const Profile = () => {
    const styles = {
        button: {
            float: "left",
            marginTop: "10px",
        },
    };

    const { error, saveFile } = useMoralisFile();
    const [banner, setBanner] = useState();
    const [pfp, setPfp] = useState();
    const user = moralis.User.current();
    const [isWithdrawInProgress, setIsWithdrawInProgress] = useState(false);

    const {
        data,
        error: executeContractError,
        fetch: executeContractFunction,
        isFetching,
        isLoading,
    } = useWeb3ExecuteFunction();

    const { 
        Moralis,
        isWeb3Enabled,
        enableWeb3,
        isAuthenticated,
        isWeb3EnableLoading 
    } = useMoralis();    

    useEffect(() => {
        if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
            enableWeb3();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated, isWeb3Enabled]);

    useEffect(() => {
        if (!isLoading && !isFetching && data) {
            setIsWithdrawInProgress(false);

            Modal.success({
                title: "Congrats! Your withdraw was successful!",
                content: (
                    <div>
                        <p>
                            {/* FIGURE OUT HOW TO PULL THIS DATA IN? */}
                            {/* <b>Withdraw amount:</b> {testData.Name} */} 
                        </p> 
                    </div>
                ),
                onOk() {
                    window.location.reload();
                }
            });
        }
    }, [isFetching, isLoading]);

    useEffect(() => {
        if (executeContractError && executeContractError.code === 4001) {
            setIsUploadInProgress(false);
            notification.error({
                message: "Contract Error",
                description: executeContractError.message,
            });
        }
    }, [executeContractError]);

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
                    Withdraw Funds!
                </Button>
            </div>
        </div>
      </div>
    </>
  )
}

export default Profile
