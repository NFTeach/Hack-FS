import React, { useEffect, useState } from 'react';
import { Redirect, useLocation } from 'react-router';
import { dummyData } from "../util/testData";
import { 
    Card, 
    Typography,  
    Button
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

    const { testData } = location.state;
    const ipfsUrl = testData.e.attributes.testData;
    const ipfsHash = ipfsUrl.slice(34);
    console.log(testData)
    
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
    
    console.log(testData.e)
    
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

    // NEED TO ADD CONTRACT INTERACTION HERE

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