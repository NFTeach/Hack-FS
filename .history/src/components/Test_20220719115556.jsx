import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { dummyData } from "../util/testData";
import { 
    Card, 
    Typography, 
    Input, 
    Button
} from 'antd';
import useWindowDimensions from '../util/useWindowDimensions';

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
    const { TextArea } = Input;

    const { width } = useWindowDimensions();
    const isMobile = width < 700;
    const location = useLocation();

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [myAnswer, setMyAnswer] = useState("");
    const [score, setScore] = useState(0);
    const [finish, setFinish] = useState(false);
    const [clickAnswer, setClickAnswer] = useState(false);
    const [unformattedData, setUnformattedData] = useState({})
    const [data, setData] = useState(dummyData);

    const { testData } = location.state;
    const ipfsUrl = testData.e.attributes.testData;
    const ipfsHash = ipfsUrl.slice(34);
    
    // console.log(ipfsHash)
    useEffect(() => {
        async function fetchTestData() {
            try {
                const url = `https://gateway.moralisipfs.com/ipfs/${ipfsHash}`;
                const response = await fetch(url);
                const dataJson = await response.json();
                setUnformattedData(dataJson)
            } catch (error) {
                console.error(error)
            }
        }
        fetchTestData();
    }, []); 

    console.log(unformattedData)
    // console.log(data)
    
    const checkAnswer = (variant) => {
        setMyAnswer(variant);
        setClickAnswer(true);
    };

    const checkCorrectAnswer = () => {
        if (myAnswer === data[currentQuestion].answer) {
          setScore(score + 1);
        }
    };

    const reset = () => {
        setClickAnswer(false);
    };
    
    const finishHandler = () => {
        if (currentQuestion === data.length - 1) {
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
                      title={"Test (PASS IN TEST NAME HERE)"}
                    >
                        <Text style={styles.text}>
                            {`Test over! Your Final Score is ${score}/${data.length - 1}`}
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
                    title={"Test (PASS IN TEST NAME HERE)"}
                >
                    <Text style={styles.text}>
                        {data[currentQuestion].question}
                    </Text>
                    <br/>
                    <br/>
                    
                    {data[currentQuestion].variants.map((variant) => (
                        <Button
                            key={variant.id}
                            block
                            className={`variant ${
                                myAnswer === variant
                                  ? myAnswer === data[currentQuestion].answer
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

                    {currentQuestion < data.length - 1 && (
                        <Button
                            onClick={() => {
                                setCurrentQuestion(currentQuestion + 1);
                                checkCorrectAnswer();
                                reset();
                            }}
                        >
                            Next Question
                        </Button>
                    )}

                    {currentQuestion === data.length - 1 && (
                        <Button
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