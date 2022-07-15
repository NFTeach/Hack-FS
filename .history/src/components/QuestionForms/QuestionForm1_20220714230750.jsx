import React from 'react';
import { 
    Card, 
    Typography, 
    Input, 
    Button
} from 'antd';
import useWindowDimensions from '../../util/useWindowDimensions';

const QuestionForm1 = (props) => {
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
        text: {
            fontSize: "14px",
            alignSelf: "center",
        },
    };

    const { Text } = Typography;
    const { TextArea } = Input;

    const { width } = useWindowDimensions();
    const isMobile = width < 700;

    const { data, handleChange, next } = props;

    return (
        <form style={styles.container}>
            <main style={styles.main}>
                <Card
                    style={!isMobile ? styles.card : styles.mobileCard}
                    title={"Create Multiple Choice Test Below (10 Questions)"}
                >
                    <Text style={styles.title}>Question 1</Text>
                    <br/>
                    <br/>
                    <Text style={styles.text}>
                        Question  
                    </Text>
                    <TextArea
                        placeholder="What is the question?"
                        showCount
                        maxLength={512}
                        style={{ height: 100}}
                        autoSize={{ minRows: 6, maxRows: 6 }}
                        onChange={handleChange}
                        value={data.question}
                    />
                    <Text style={styles.text}>
                        Answer 
                    </Text>
                    <TextArea
                        placeholder="What is correct answer?"
                        showCount
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
                        maxLength={512}
                        style={{ height: 100}}
                        autoSize={{ minRows: 2, maxRows: 2 }}
                        onChange={handleChange}
                        value={data.fAnswer1}
                    />
                    <Text style={styles.text}>
                        False Answer 2
                    </Text>
                    <TextArea
                        placeholder="What is second false answer?"
                        showCount
                        maxLength={512}
                        style={{ height: 100}}
                        autoSize={{ minRows: 2, maxRows: 2 }}
                        onChange={handleChange}
                        value={data.fAnswer2}
                    />
                    <Button
                        style={styles.nextButton}
                        type="primary"
                        onClick={next}
                    >
                        Next Question
                    </Button>
                </Card>
            </main>
        </form>
    )
}

export default QuestionForm1
