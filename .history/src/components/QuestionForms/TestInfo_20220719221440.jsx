import React from 'react';
import { 
    Card, 
    Typography, 
    Input, 
    Button,
    InputNumber
} from 'antd';
import useWindowDimensions from '../../util/useWindowDimensions';

const TestInfo = (props) => {
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

    const numberChange = (value) => {
        console.log('changed', value);
    }
    return (
        <form style={styles.container}>
            <main style={styles.main}>
                <Card
                    style={!isMobile ? styles.card : styles.mobileCard}
                    title={"Create Multiple Choice Test (10 Questions)"}
                >
                    <Text style={styles.title}>Test Info</Text>
                    <br/>
                    <br/>
                    <Text style={styles.text}>
                        Test Name  
                    </Text>
                    <TextArea
                        placeholder="What is the name of the test?"
                        showCount
                        name="Name"
                        maxLength={512}
                        style={{ height: 100}}
                        autoSize={{ minRows: 2, maxRows: 2 }}
                        value={data.name}
                        onChange={handleChange}
                    />
                    <Text style={styles.text}>
                        Test Category 
                    </Text>
                    <TextArea
                        placeholder="What is the test category?"
                        showCount
                        name="Category"
                        maxLength={512}
                        style={{ height: 100}}
                        autoSize={{ minRows: 2, maxRows: 2 }}
                        value={data.category}
                        onChange={handleChange}
                    />
                    <Text style={styles.text}>
                        Educator
                    </Text>
                    <TextArea
                        placeholder="What is the educator's name?"
                        showCount
                        name="Educator"
                        maxLength={512}
                        style={{ height: 100}}
                        autoSize={{ minRows: 2, maxRows: 2 }}
                        onChange={handleChange}
                        value={data.educator}
                    />
                    <Text style={styles.text}>
                        Difficulty
                    </Text>
                    <TextArea
                        placeholder="What is the test difficulty?"
                        showCount
                        name="Difficulty"
                        maxLength={512}
                        style={{ height: 100}}
                        autoSize={{ minRows: 2, maxRows: 2 }}
                        onChange={handleChange}
                        value={data.difficulty}
                    />
                    <Text style={styles.text}>
                        Passing Grade (Please only single digit input! (i.e. 7 = 7/10 or 70%))
                    </Text>
                    <TextArea
                        placeholder="What is passing grade out of 10 questions? "
                        showCount
                        name="PassingGrade"
                        maxLength={512}
                        style={{ height: 100}}
                        autoSize={{ minRows: 2, maxRows: 2 }}
                        onChange={handleChange}
                        value={data.passingGrade}
                    />
                    <Text style={styles.text}>
                        SBT Mint Price (Please submit number in terms of Matic (i.e. 1 Matic, min=0.0001, max=1000))
                    </Text>
                    <br/>
                    <InputNumber 
                        min={0.0001}
                        max={1000}
                        defaultValue={1}
                        onChange={numberChange}
                        value={data.price}
                    />
                    <br/>
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

export default TestInfo
