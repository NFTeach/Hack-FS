import React, { useState } from 'react';
import { data } from "../util/testData";
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
        nextButton: {
            float: "right",
            marginTop: "10px",
        },
        backButton: {
            float: "left",
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

    // console.log(data)
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [myAnswer, setMyAnswer] = useState("");
    const [score, setScore] = useState(0);
    const [finish, setFinish] = useState(false);
    const [clickAnswer, setClickAnswer] = useState(false);

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
        setShow(false);
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

    return (
        <>
            <div style={styles.container}>
                <main style={styles.main}>
                    <h1>Hello world!</h1>
                </main>
            </div>
        </>
    )
}

export default Test