import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { dummyData } from "../util/testData";
import { 
    Card, 
    Typography,  
    Button,
    Modal,
    notification
} from 'antd';
import useWindowDimensions from '../util/useWindowDimensions';
import {
    useMoralis,
    useWeb3ExecuteFunction,
    useMoralisWeb3Api,
    useMoralisFile
} from "react-moralis";
import moralis from "moralis";
import { CONTRACT_ADDRESS } from './consts/vars';
import { NFTEACH_CONTRACT_ABI } from './consts/contractABIs';

moralis.initialize(process.env.REACT_APP_MORALIS_APPLICATION_ID);
moralis.serverURL = process.env.REACT_APP_MORALIS_SERVER_URL;

const Test = () => {
    const styles = {
        title: {
            fontSize: "20px",
            fontWeight: "700",
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
        button: {
            float: "right",
            marginTop: "10px",
        },
        text: {
            fontSize: "14px",
            alignSelf: "center",
        },
    };

    const { Text } = Typography;

    const { width } = useWindowDimensions();
    const isMobile = width < 700;
    const location = useLocation();

    const { 
        Moralis,
        isWeb3Enabled,
        enableWeb3,
        isAuthenticated,
        isWeb3EnableLoading 
    } = useMoralis();
    const user = moralis.User.current();
    const Web3Api = useMoralisWeb3Api();
    const { error, saveFile } = useMoralisFile();
    // console.log(user.attributes.accounts[0])

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [myAnswer, setMyAnswer] = useState("");
    const [score, setScore] = useState(0);
    const [finish, setFinish] = useState(false);
    const [clickAnswer, setClickAnswer] = useState(false);
    const [Data, setData] = useState(dummyData);
    const [isMintingInProgress, setIsMintingInProgress] = useState(false);

    const {
        data,
        error: executeContractError,
        fetch: executeContractFunction,
        isFetching,
        isLoading,
    } = useWeb3ExecuteFunction();

    useEffect(() => {
        if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
            enableWeb3();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated, isWeb3Enabled]);

    const { testData } = location.state;
    const ipfsUrl = testData.e.attributes.testData;
    const ipfsHash = ipfsUrl.slice(34);
    // console.log(testData.e.attributes)
    
    useEffect(() => {
        async function fetchTestData() {
            try {
                const url = `https://gateway.moralisipfs.com/ipfs/${ipfsHash}`;
                const response = await fetch(url);
                const dataJson = await response.json();
                setData(dataJson);
            } catch (error) {
                console.error(error)
            }
        }
        fetchTestData();
    }, []);

    useEffect(() => {
        if (!isLoading && !isFetching && data) {
            setIsMintingInProgress(false);

            Modal.success({
                title: "Congrats! You have been validated, click OK button below to mint SBT",
                content: (
                    <div>
                        <p>
                            <b>Title:</b> {testData.e.attributes.testName}
                        </p>
                        <p>
                            <b>Category:</b> {testData.e.attributes.testCategory}
                        </p>
                        <p>
                            <b>Educator:</b> {testData.e.attributes.educatorName}
                        </p>
                        <p>
                            <b>Difficulty:</b> {testData.e.attributes.testDifficulty}
                        </p>
                        <p>
                            <b>PassingGrade:</b> {testData.e.attributes.passingGrade}
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
            setIsMintingInProgress(false);
            notification.error({
                message: "Contract Error",
                description: executeContractError.message,
            });
        }
    }, [executeContractError]);

    // onlyOwner validate student cloud smart contract call
    const allowValidation = async () => {

        let studentAccount = user.attributes.accounts[0];
        let tokenId = JSON.stringify(testData.e.attributes.tokenId);

        const studentParams = {
            to: studentAccount,
            id: tokenId
        }

        async function callValidateStudent() {
            const _Result = await Moralis.Cloud.run("validateStudentTest", studentParams)
            console.log(_Result)
        }
        callValidateStudent();
    }

    // const validateStudentPassTest = async () => {

    //     if (isAuthenticated) {
    //         notification.info({
    //             message: "Validating address",
    //             description: "Your address is being validated to allow you to mint your SBT. PLEASE DON'T REFRESH PAGE!"
    //         })
        
    //         // ADD STATS IN FUNC BELOW THAT COULD BE DISPLAY ON THE STUDENT DASHBOARD HERE 
    //         // (MAYBE, MIGHT BE ABLE TO DO THIS WITH ONLY EVENTS)
    //         // async function saveTestResults() {

    //         // }

    //         executeContractFunction({
    //             params: {
    //                 abi: NFTEACH_CONTRACT_ABI,
    //                 contractAddress: CONTRACT_ADDRESS,
    //                 functionName: "validateStudentTest",
    //                 params: {
    //                     _student: user.attributes.accounts[0], 
    //                     _tokenId: JSON.stringify(testData.e.attributes.tokenId),
    //                 },
    //             },
        //         onSuccess: () => {
        //             //saveTestResults()
        //         },
        //         onError: () => {
        //             notification.error({
        //                 message: "Error has occured. Pleas try again!",
        //             })
        //         }
        //     });
        // } else {
        //     setIsValidatingInProgress(false);
        //     notification.error({
        //         message: "You need to have your wallet connected to submit test",
        //         description: "In order to use this feature, you have to connect your wallet."
        //     });
        // }
    // }

    const mintSBTtoValidatedStudent = async () => {

        if(isAuthenticated) {
            notification.info({
                message: "Minting SBT",
                description: "Your SBT is being minted to your address. PLEASE DON'T REFRESH PAGE!"
            })
        

            // const fetchTransaction = async () => {
            //     const options = {
            //         chain: "goerli",
            //         transaction_hash: data.hash
            //     }
            // }

            executeContractFunction({
                params: {
                    abi: NFTEACH_CONTRACT_ABI,
                    contractAddress: CONTRACT_ADDRESS,
                    functionName: "mintSBT",
                    params: {
                        _tokenId: JSON.stringify(testData.e.attributes.tokenId)
                    },
                    msgValue: Moralis.Units.ETH(testData.e.attributes.testPrice)
                },
                onSuccess: () => {
                },
                onError: (error) => {
                    notification.error({
                        message: error,
                    })
                }
            })
        } else {
            setIsMintingInProgress(false);
            notification.error({
                message: "You need to have your wallet connected to create a test",
                description: "In order to use this feature, you have to connect your wallet."
            });
        }
    }

    if(error) {
        notification.error({
            message: "Error",
            description: "Please try again and make sure you haven't already validated and minted this SBT"
        })
        setIsMintingInProgress(false);
    }
            
    const checkAnswer = (variant) => {
        setMyAnswer(variant);
        setClickAnswer(true);
    };

    const checkCorrectAnswer = () => {
        if (myAnswer === Data[currentQuestion].answer) {
          setScore(score + 1);
        }
    };

    const reset = () => {
        setClickAnswer(false);
    };
    
    const finishHandler = () => {
        if (currentQuestion === Data.length - 1) {
            setFinish(true);
        }
    };
    
    const startOver = () => {
    setCurrentQuestion(0);
    setFinish(false);
    setMyAnswer("");
    setScore(0);
    };

    console.log(data)

    if(finish) {
        return (
            <form style={styles.container}>
                <main style={styles.main}>
                    <Card
                      style={!isMobile ? styles.card : styles.mobileCard}
                      title={`Test ${testData.e.attributes.testName}`}
                    >
                        <Text style={styles.text}>
                            {`Test over! Your Final Score is ${score}/${Data.length - 1}`}
                        </Text>
                        <br/>
                        {JSON.stringify(score) >= testData.e.attributes.passingGrade ? (
                        <Button 
                            style={styles.button}
                            type="primary"
                            loading={isMintingInProgress}
                            onClick={async () => {
                                setIsMintingInProgress(true);
                                await allowValidation();
                                setTimeout(mintSBTtoValidatedStudent, 300000)
                            }}
                        >
                            You Passed! Click here to mint SBT!
                        </Button> 
                        ) : (
                        <Button
                            style={styles.button}
                            type="primary"
                            onClick={() => startOver()}
                        >
                            You didn't pass. Start Over?
                        </Button>
                        )}
                    </Card> 
                </main>
            </form>
        )
    } else {
        return (
            <form style={styles.container}>
                <main style={styles.main}>
                <Card
                    style={!isMobile ? styles.card : styles.mobileCard}
                    title={`Test ${testData.e.attributes.testName}`}
                >
                    <Text style={styles.text}>
                        {Data[currentQuestion].question}
                    </Text>
                    <br/>
                    <br/>
                    
                    {Data[currentQuestion].variants.map((variant) => (
                        <Button
                            key={variant.id}
                            block
                            className={`variant ${
                                myAnswer === variant
                                  ? myAnswer === Data[currentQuestion].answer
                                    ? "correctAnswer"
                                    : "incorrectAnswer"
                                  : null
                              }`}
                            onClick={() => {
                                checkAnswer(variant);
                                
                            }}
                        >
                            {variant}
                            <br/>
                        </Button>
                    ))}
                    <br/>
                    <br/>

                    {currentQuestion < Data.length - 1 && (
                        <Button
                            style={styles.button}
                            type="primary"
                            onClick={() => {
                                setCurrentQuestion(currentQuestion + 1);
                                checkCorrectAnswer();
                                reset();
                            }}
                        >
                            Next Question
                        </Button>
                    )}

                    {currentQuestion === Data.length - 1 && (
                        <Button
                            style={styles.button}
                            type="primary"
                            onClick={() => finishHandler()}
                        >
                            Finish Test
                        </Button>
                    )}
                </Card>
                </main>
            </form>
        )
    }    
}

export default Test