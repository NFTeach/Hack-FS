import React, { useEffect, useState } from 'react';
import { Redirect, useLocation } from 'react-router';
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
    useWeb3ExecuteFunction
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
    // console.log(user.attributes.accounts[0])

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [myAnswer, setMyAnswer] = useState("");
    const [score, setScore] = useState(0);
    const [finish, setFinish] = useState(false);
    const [clickAnswer, setClickAnswer] = useState(false);
    const [Data, setData] = useState(dummyData);
    const [isValidatingInProgress, setIsValidatingInProgress] = useState(false);

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
    console.log(testData.e.attributes.passignGrade)
    
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
            setIsValidatingInProgress(false);

            Modal.success({
                title: "Congrats! You have passed the test!",
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
                    // NEED TO TRIGGER THE MINT OF THE TOKEN HERE!
                    // setFormattedData({});
                    // window.location.reload();
                }
            });
        }
    }, [isFetching, isLoading]);

    useEffect(() => {
        if (executeContractError && executeContractError.code === 4001) {
            setIsValidatingInProgress(false);
            notification.error({
                message: "Contract Error",
                description: executeContractError.message,
            });
        }
    }, [executeContractError]);

    const validateStudentPassTest = async () => {

        if (isAuthenticated) {
            notification.info({
                message: "Uploading in progress",
                description: "Your test is being upload to IPFS and data stored on the smart contract. PLEASE DON'T REFRESH PAGE!"
            })
        

            // ADD STATS IN FUNC BELOW THAT COULD BE DISPLAY ON THE STUDENT DASHBOARD HERE
            // async function saveTestResults() {

            // }

            executeContractFunction({
                params: {
                    abi: NFTEACH_CONTRACT_ABI,
                    contractAddress: CONTRACT_ADDRESS,
                    functionName: "validateStudentTest",
                    params: {
                        _student: user.attributes.accounts[0], 
                        _tokenId: testData.e.attributes.tokenId,
                    },
                },
                onSuccess: () => {
                    // saveTestResults();
                    window.alert("Success!");
                },
                onError: (error) => {
                    notification.error({
                        message: error,
                    })
                }
            });
        } else {
            setIsValidatingInProgress(false);
            notification.error({
                message: "You need to have your wallet connected to submit test",
                description: "In order to use this feature, you have to connect your wallet."
            });
        }
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

    console.log(score)

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
                        {score >= testData.e.atrributes.passignGrade}
                        <Button
                            style={styles.button}
                            type="primary"
                            onClick={() => startOver()}
                        >
                            Start Over
                        </Button>
                        {/* USE TERNARY OPERATOR CONDITIONAL ON PASSING TEST TO DISPLAY THESE BUTTONS? */}
                        {/* <Button 
                            style={styles.button}
                            type="primary"
                            // onClick={TBD}
                        >
                            Congrats! Collect SBT!
                        </Button> */}
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