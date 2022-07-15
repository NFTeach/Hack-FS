import { 
    Card, 
    Typography, 
    Input 
} from 'antd';
import React from 'react';
import useWindowDimensions from '../util/useWindowDimensions';

const CreateTest = () => {
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
        textAuthor: {
            fontSize: "14px",
            marginLeft: "10px",
            alignSelf: "center",
        },
        inputContainer: {
            display: "flex",
            flexWrap: "wrap",
        },
        childInputContainer: {
            padding: "10px",
        },
    };

    const { Text } = Typography;
    const { TextArea } = Input;

    const { width } = useWindowDimensions();
    const isMobile = width < 700;

    return (
        
        <div style={styles.container}>
            <main style={styles.main}>
                <Card
                    style={!isMobile ? styles.card : styles.mobileCard}
                    title={"Create Multiple Choice Test Below"}
                >
                    <Text style={styles.text}>
                        Question 1 
                    </Text>
                    <TextArea
                        placeholder="What is the question?"
                        showCount
                        maxLength={512}
                        style={{ height: 100}}
                        autoSize={{ minRows: 2, maxRows: 2 }}
                        // onChange={(e) => setDescriptionText(e.target.value)}
                        // value={descriptionText}
                    />
                    <TextArea
                        placeholder="Answer"
                        showCount
                        maxLength={512}
                        style={{ height: 145}}
                        autoSize={{ minRows: 2, maxRows: 2 }}
                        // onChange={(e) => setDescriptionText(e.target.value)}
                        // value={descriptionText}
                    />
                </Card>
            </main>
        </div>
    )
}

export default CreateTest
