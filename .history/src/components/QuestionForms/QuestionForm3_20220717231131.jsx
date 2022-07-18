import React from 'react';
import { 
    Card, 
    Typography, 
    Input, 
    Button
} from 'antd';
import useWindowDimensions from '../../util/useWindowDimensions';

const QuestionForm3 = (props) => {
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

    const { data, handleChange, next, back } = props;
  return (
    <div style={styles.container}>
            <main style={styles.main}>
                <Card
                    style={!isMobile ? styles.card : styles.mobileCard}
                    title={"Create Multiple Choice Test (10 Questions)"}
                >
                    <Text style={styles.title}>Question 3</Text>
                    <br/>
                    <br/>
                    <Text style={styles.text}>
                        Question  
                    </Text>
                    <TextArea
                        placeholder="What is the question?"
                        showCount
                        name="Question_3"
                        maxLength={512}
                        style={{ height: 100}}
                        autoSize={{ minRows: 2, maxRows: 2 }}
                        onChange={handleChange}
                        value={data.question}
                    />
                    <Text style={styles.text}>
                        Answer 
                    </Text>
                    <TextArea
                        placeholder="What is correct answer?"
                        showCount
                        name="Answer_3"
                        maxLength={512}
                        style={{ height: 100}}
                        autoSize={{ minRows: 2, maxRows: 2 }}
                        onChange={handleChange}
                        value={data.answer}
                    />
                    <Text style={styles.text}>
                        False Answer 1
                    </Text>
                    <TextArea
                        placeholder="What is first false answer?"
                        showCount
                        name="Question_3_False_Answer_1"
                        maxLength={512}
                        style={{ height: 100}}
                        autoSize={{ minRows: 2, maxRows: 2 }}
                        onChange={handleChange}
                        value={data.fAnswer}
                    />
                    <Text style={styles.text}>
                        False Answer 2
                    </Text>
                    <TextArea
                        placeholder="What is second false answer?"
                        showCount
                        name="Question_3_False_Answer_2"
                        maxLength={512}
                        style={{ height: 100}}
                        autoSize={{ minRows: 2, maxRows: 2 }}
                        onChange={handleChange}
                        value={data.fAnswer}
                    />
                    <Text style={styles.text}>
                        False Answer 3
                    </Text>
                    <TextArea
                        placeholder="What is third false answer?"
                        showCount
                        name="Question_3_False_Answer_3"
                        maxLength={512}
                        style={{ height: 100}}
                        autoSize={{ minRows: 2, maxRows: 2 }}
                        onChange={handleChange}
                        value={data.fAnswer}
                    />
                    <Button
                        style={styles.nextButton}
                        type="primary"
                        onClick={next}
                    >
                        Next Question
                    </Button>
                    <Button
                        style={styles.backButton}
                        type="primary"
                        onClick={back}
                    >
                        Previous Question
                    </Button>
                </Card>
            </main>
        </div>
  )
}

export default QuestionForm3
