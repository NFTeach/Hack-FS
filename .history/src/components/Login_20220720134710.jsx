import React, { useState, useEffect } from 'react';
import { 
    useMoralis,
    useWeb3ExecuteFunction
 } from "react-moralis";
import moralis, { Moralis } from "moralis";
import {
    Card,
    Button,
    notification
} from 'antd';
import useWindowDimensions from '../util/useWindowDimensions';
import { ConnectButton } from 'web3uikit';
import { CONTRACT_ADDRESS } from './consts/vars';
import { NFTEACH_CONTRACT_ABI } from './consts/contractABIs';

let appId=process.env.REACT_APP_MORALIS_APPLICATION_ID;
let serverUrl=process.env.REACT_APP_MORALIS_SERVER_URL;
moralis.initialize(appId);
moralis.serverURL = serverUrl;
Moralis.start({serverUrl, appId})

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
            float: "right",
            marginTop: "10px",
        },
        educatorButton: {
            float: "left",
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

    // const [isStudentRegisteringInProgress, setIsStudentRegisteringInProgress] = useState(false);
    // const [isEducatorRegisteringInProgress, setIsEducatorRegisteringInProgress] = useState(false);
    // console.log(user.attributes.accounts[0])

    // // Invoked to register user address as a student
    // const {
    //     data,
    //     error: executeStudentContractError,
    //     fetch: executeStudentContractFunction,
    //     isFetching,
    //     isLoading,
    // } = useWeb3ExecuteFunction();

    // useEffect(() => {
    //     if (executeStudentContractError && executeStudentContractError.code === 4001) {
    //         setIsStudentRegisteringInProgress(false);
    //         notification.error({
    //             message: "NFT Mint Error",
    //             description: executeStudentContractError.message,
    //         });
    //     }
    // }, [executeStudentContractError]);

    // // Invoked to register user address as a educator
    // const {
    //     educatorData,
    //     error: executeEducatorContractError,
    //     fetch: executeEducatorContractFunction,
    //     isEducatorFetching,
    //     isEducatorLoading,
    // } = useWeb3ExecuteFunction();

    // useEffect(() => {
    //     if (executeEducatorContractError && executeEducatorContractError.code === 4001) {
    //         setIsEducatorRegisteringInProgress(false);
    //         notification.error({
    //             message: "NFT Mint Error",
    //             description: executeEducatorContractError.message,
    //         });
    //     }
    // }, [executeEducatorContractError]);

    useEffect(() => {
        if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
            enableWeb3();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated, isWeb3Enabled]);

    // Student smart contract call
    const registerStudent = async () => {
        if (isAuthenticated) {
            notification.info({
                message: "Register address as student",
                description: "Your address will be registered as a student. PLEASE DON'T REFRESH PAGE!"
            })  
        }

        let address=user.attributes.accounts[0];
        console.log(user)

        // executeStudentContractFunction({
        //     params: {
        //         abi: NFTEACH_CONTRACT_ABI,
        //         contractAddress: CONTRACT_ADDRESS,
        //         functionName: "addStudent",
        //         params: {
        //             _newStudent: user.attributes.accounts[0] 
        //         },
        //     },
        //     onSuccess: () => {
        //         window.alert("Congrats! Your address is registered as a student.")
        //     },
        //     onError: (error) => {
        //         window.alert("Error!")
        //     }  
        // })
    }

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
                            // loading={isStudentRegisteringInProgress}
                            onClick={async () => {
                                // setIsStudentRegisteringInProgress(true);
                                await registerStudent();
                            }}
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