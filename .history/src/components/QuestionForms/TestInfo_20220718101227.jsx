import React from 'react';
import { 
    Card, 
    Typography, 
    Input, 
    Button,
    Select,
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
    const { Option } = Select;

    const { width } = useWindowDimensions();
    const isMobile = width < 700;

    const { data, handleChange, next, back } = props;
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
                    <Select
                        placeholder="What is the category?"
                        name="Category"
                        style={{  width: 155, marginLeft: "10px" }}
                        onChange={handleChange}
                        value={data.category}
                    >
                        <Option value="NFTs">NFTs</Option>
                        <Option value="DAOs">DAOs</Option>
                        <Option value="Defi">Defi</Option>
                        <Option value="Science">Science</Option>
                        <Option value="History">History</Option>
                        <Option value="Other">Other</Option>
                    </Select>
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
                    <Select
                        placeholder="What is the test difficulty?"
                        name="Difficulty"
                        style={{  width: 155, marginLeft: "10px" }}
                        onChange={handleChange}
                        value={data.difficulty}
                    >
                        <Option value="Easy">Easy</Option>
                        <Option value="Intermediate">Intermediate</Option>
                        <Option value="Hard">Hard</Option>
                    </Select>
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
