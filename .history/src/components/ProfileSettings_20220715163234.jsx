import React, { useState, useRef, useEffect } from 'react';
import { Input } from 'antd';
import { defaultImgs } from '../images/defaultImgs';
import { useMoralis, useMoralisWeb3Api } from "react-moralis";

const appId = process.env.REACT_APP_MORALIS_APPLICATION_ID;
const serverUrl = process.env.REACT_APP_MORALIS_SERVER_URL;
const moralisSecert = process.env.REACT_APP_MORALIS_SECERT;

const ProfileSettings = () => {

    const [pfps, setPfps] = useState([]);
    const [selectedPFP, setSelectedPFP] = useState();
    const inputFile = useRef(null);
    const [selectedFile, setSelectedFile] = useState(defaultImgs[1]);
    const [theFile, setTheFile] = useState();
    const [username, setUsername] = useState();
    const [bio, setBio] = useState();
    const { Moralis, isAuthenticated, account } = useMoralis();
    const Web3Api = useMoralisWeb3Api();

    const resolveLink = (url) => {
        if (!url || !url.includes("ipfs://")) return url;
        return url.replace("ipfs://", "https://gateway.ipfs.io/ipfs/");
    };

    useEffect(() => {

        const fetchNFTs = async () => {
            const options = {
                chain: "mumbai",
                address: account
            }
            await Moralis.start({ serverUrl, appId, moralisSecert });
            const NFTs = await Web3Api.account.getNFTs(options);
            // console.log(NFTs)
            const images = NFTs.result.map(
                (e) => resolveLink(JSON.parse(e.metadata)?.image)
            )
            // console.log(images)
            setPfps(images);
        }
        fetchNFTs();
    }, [isAuthenticated, account])

    return (
        <div>
        <h1>Hello world!</h1>
        </div>
    )
}

export default ProfileSettings
