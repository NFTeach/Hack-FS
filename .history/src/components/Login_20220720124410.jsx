import React, { useState, useEffect } from 'react';
import { 
    useMoralis,
    useWeb3ExecuteFunction
 } from "react-moralis";
import moralis from "moralis";
import {
    Card,
    Button
} from 'antd';
import useWindowDimensions from '../util/useWindowDimensions';
import { ConnectButton } from 'web3uikit';
import { CONTRACT_ADDRESS } from './consts/vars';
import { NFTEACH_CONTRACT_ABI } from './consts/contractABIs';

moralis.initialize(process.env.REACT_APP_MORALIS_APPLICATION_ID);
moralis.serverURL = process.env.REACT_APP_MORALIS_SERVER_URL;

const Login = () => {
    const styles = {
        title: {
            fontSize: "20px",
            fontWeight: "700",
            justifyContent: "center",
            alignItems: "center",
        },
        card: {
            boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
            border: "1px solid #e7eaf3",
            borderRadius: "0.5rem",
            width: "50%",
        },
        mobileCard: {
            boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
            border: "1px solid #e7eaf3",
            borderRadius: "0.5rem",
            width: "100%",
        },
        container: {
            padding: "0 2rem",
        },
        main: {
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100vw",
        },
        studentButton: {
            float: "left",
            marginTop: "10px",
        },
        educatorButton: {
            float: "right",
            marginTop: "10px",
        },
    };

    const { width } = useWindowDimensions();
    const isMobile = width < 700;

    const { 
        Moralis,
        isWeb3Enabled,
        enableWeb3,
        isAuthenticated,
        isWeb3EnableLoading  
    } = useMoralis();

    const user = moralis.User.current();
    const [isStudentRegistered, setIsStudentRegistered] = useState();
    const [isEducatorRegistered, setIsEducatorRegistered] = useState();
    console.log(user.attributes.accounts)

    // Invoked to register user address as a student
    // const {
    //     data,
    //     error: executeStudentContractError,
    //     fetch: executeStudentContractFunction,
    //     isFetching,
    //     isLoading,
    // } = useWeb3ExecuteFunction();

    // useEffect(() => {
    //     if (executeStudentContractError && executeStudentContractError.code === 4001) {
    //         setIsUploadInProgress(false);
    //         notification.error({
    //             message: "NFT Mint Error",
    //             description: executeStudentContractError.message,
    //         });
    //     }
    // }, [executeStudentContractError]);

    // // Invoked to register user address as a educator
    // const {
    //     data,
    //     error: executeEducatorContractError,
    //     fetch: executeEducatorContractFunction,
    //     isFetching,
    //     isLoading,
    // } = useWeb3ExecuteFunction();

    // useEffect(() => {
    //     if (executeEducatorContractError && executeEducatorContractError.code === 4001) {
    //         setIsUploadInProgress(false);
    //         notification.error({
    //             message: "NFT Mint Error",
    //             description: executeEducatorContractError.message,
    //         });
    //     }
    // }, [executeEducatorContractError]);

    // useEffect(() => {
    //     if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
    //         enableWeb3();
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [isAuthenticated, isWeb3Enabled]);

    // // Student smart contract call
    // const registerStudent = async () => {
    //     if (isAuthenticated) {
    //         notification.info({
    //             message: "Register address as student",
    //             description: "Your address will be registered as a student. PLEASE DON'T REFRESH PAGE!"
    //         })  
    //     }

    //     executeStudentContractFunction({
    //         params: {
    //             abi: NFTEACH_CONTRACT_ABI,
    //             contractAddress: CONTRACT_ADDRESS,
    //             functionName: "addStudent",
    //             params: {
    //                 _price: user 
    //             },
    //         },  
    //     })
    // }

    return (
        <>
        {isAuthenticated ? (
            <div style={styles.container}>
                <main style={styles.main}>
                    <Card
                        style={!isMobile ? styles.card : styles.mobileCard}
                        title={"Are you here to learn or teach?"}
                    >
                        <Button
                            style={styles.educatorButton}
                            type="primary"
                            // loading={}
                            // onClick={async () => {
                                
                            // }}
                        >
                            Click here to register address as educator!
                        </Button>
                        <Button
                            style={styles.studentButton}
                            type="primary"
                            // loading={}
                            // onClick={async () => {
                                
                            // }}
                        >
                            Click here to register address as student!
                        </Button> 
                    </Card>
                </main>
            </div>
        ) : (
            <>
                <h1>Welcome to NFTeach!</h1>
                <ConnectButton />
            </>
        )}
        </>
    )
}

export default Login