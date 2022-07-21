import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
// import { data } from "../util/testData";
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
    const [jsonData, setJsonData] = useState({});
    const [data, setData] = useState(null);

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
                const formatData = [
                    {
                        id: "0",
                        question: dataJson.Question_1,
                        answer: dataJson.Answer_1,
                        variants: [
                            dataJson.Answer_1, 
                            dataJson.Question_1_False_Answer_1, 
                            dataJson.Question_1_False_Answer_2, 
                            dataJson.Question_1_False_Answer_3,
                        ]
                      },
                  
                      {
                        id: "1",
                        question: "What kind of dog keeps the best time?",
                        answer: "Watchdog",
                        variants: [`Watchdog`, `hotdog`, `Cutedog`, 'Fundog']
                      },
                  
                      {
                        id: "2",
                        question:
                          "What time of day, when written in a capital letters, is the same forwards, backwards and upside down?",
                        answer: "Noon",
                        variants: [`Morning`, `Noon`, `Evening`, 'Midnight']
                      },
                    
                      {
                        id: "3",
                        question: "What has a face and two hands but no arms or legs?",
                        answer: "Clock",
                        variants: [`Clock`, `Watch`, `Person`, 'Cat']
                      },
                  
                      {
                        id: "4",
                        question:
                          "What five-letter word becomes shorter when you add two letters to it?",
                        answer: "Short",
                        variants: [`Long`, `Short`, `Little`, 'Huge']
                      },
                    
                      {
                        id: "5",
                        question: "What has a neck but no head?",
                        answer: "Bottle",
                        variants: [`Pan`, `Bottle`, `Plate`, 'Bowl']
                      },
                    
                      {
                        id: "6",
                        question:
                          "What starts with a 'P', ends with an 'E' and has thousands of letters?",
                        answer: "Post Office",
                        variants: [`Letter`, `Envelope`, `Post Office`, 'Parchment']
                      }, 
                  
                      {
                        id: "7",
                        question: "What has to be broken before you can eat it?",
                        answer: "Egg",
                        variants: [`Bread`, `Banana`, `Egg`, 'Banana']
                      },
                  
                      {
                        id: "8",
                        question: "What begins with T, ends with T and has T in it?",
                        answer: "Teapot",
                        variants: [`Teapot`, `Teacup`, `Teatree`, 'Tweet']
                      },
                  
                      {
                        id: "9",
                        question: "Teddy bears are never hungry because they are always what?",
                        answer: "Stuffed",
                        variants: [`Full`, `Stuffed`, `Sleep`, 'Tired']
                      },
                ];
                setData(formatData)
            } catch (error) {
                console.error(error)
            }
        }
        fetchTestData();
    }, []); 
    
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
                    title={`Test ${jsonData.Name}`}
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